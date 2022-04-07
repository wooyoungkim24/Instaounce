from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import Post, db, User, Like, Comment
from flask_login import current_user, login_required
import boto3
import botocore
import os
from app.forms.update_post_form import UpdatePostForm

s3 = boto3.client(
    "s3",
    region_name="us-west-1",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)

post_routes = Blueprint('posts', __name__)

BUCKET_NAME = os.environ.get('S3_BUCKET')
print('bucketname', BUCKET_NAME)
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"


def upload_file_to_s3(file, acl="public-read"):
    print("####testing upload", file, file.filename)
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


@post_routes.route("/")
@login_required
def read_posts():
    user = User.query.get(current_user.get_id())
    # print('currentId', user)
    # posts = Post.query.filter(user.is_following(Post.user_id)).all()
    followings = user.followed_posts()
    # print(followings[0].comments)
    return {'posts':[following.to_dict() for following in followings]}


@post_routes.route('/comments', methods=["POST"])
def create_comment():
    data = request.get_json(force=True)
    new_comment = Comment(
        user_id=data["user_id"],
        post_id=data["post_id"],
        content=data["content"],
    )
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()

@post_routes.route('/comments/<id>', methods=["DELETE", "PUT"])
def deleteComment(id):
    if request.method == "DELETE":
        comment = Comment.query.filter(Comment.id == id).first()
        post_id = comment.post_id
        db.session.delete(comment)
        db.session.commit()
        return {
            "postId": post_id,
            "commentId": id
        }
    elif request.method == "PUT":
        comment = Comment.query.filter(Comment.id == id).first()
        data = request.get_json(force=True)
        # print(comment.content)
        comment.user_id = data["user_id"]
        comment.post_id = data["post_id"]
        comment.content = data["content"]

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()



@post_routes.route("/<id>/likes", methods=["POST", "DELETE"])
def create_like(id):
    if request.method == "POST":
        post_id = id
        new_like = Like(
            user_id = current_user.id,
            post_id = post_id
        )
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()

    elif request.method == "DELETE":
        post_id = id
        deleted_like = Like.query.filter(
            Like.post_id == post_id and Like.user_id == current_user.id)
        db.session.delete(deleted_like)
        db.session.commit()
        # NEEDS TO BE CHANGED
        return deleted_like.to_dict()

@post_routes.route("/<id>/likes/", methods=['DELETE'])
def delete_like(id):
  post_id = id
#   like_id = like_id
# TODO   need to grab the user id or like id
  user_id = current_user.id
  like = Like.query.filter(Like.post_id == post_id and Like.user_id == user_id)
  like.delete()
  db.session.commit()
#   return like.to_dict()
  return f"Deleted like id: "




@post_routes.route("/", methods =['POST'])
def create_post():
    files = request.files.getlist("file[]")
    # images = request.files
    caption = request.values['caption']
    new_post = Post(
        user_id=current_user.id,
        image=["placeholder"],
        caption=caption
    )
    db.session.add(new_post)
    db.session.commit()
    post_id = new_post.id

    new_images = []

    for file in files:
        # print("########## PHOTO:", photo)
        file.filename = f"Post{post_id}/{file.filename}"

        # print('#############', file.filename)
        upload = upload_file_to_s3(file)
        if "url" not in upload:
            # print('######error####', upload)
            return upload, 400

        url = upload["url"]
        print("urlstring", type(url))
        new_images.append(url)
    new_post_edit = Post.query.get(post_id)
    new_post_edit.image = new_images
    db.session.commit()
    return new_post.to_dict()

@post_routes.route("/<id>", methods=["PUT"])
@login_required
def update_post(id):
    print("begging!!!!!!")
    form = UpdatePostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print("form", form.data)
    if form.validate_on_submit():
        post_id = id
        print("post_id", post_id)
        target_post = Post.query.filter(Post.id == post_id).first()
        print("target_post before update", target_post)

        data = form.data
        caption = data['caption']
        print('cation in route!!!', caption)

        target_post.caption = caption

        db.session.commit()

        print("target_post after update", target_post)
        return target_post.to_dict()
    return "Bad"


# @posts_routes.route('/', methods=['GET','POST'])
# def create_post():

#     if request.method == 'POST':
#         data = request.get_json(force=True)

#         post = Post(content=data["content"])
#         db.session.add(post)
#         db.session.flush()
#         post.content = f"{post.content}: {post.id}"
#         db.session.commit()

#         return post.to_dict()

#     posts = Post.query.all()

#     return { "posts": sorted([p.to_dict() for p in posts], key=lambda p: p["id"], reverse=True) }
