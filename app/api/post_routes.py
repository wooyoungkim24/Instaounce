from flask import Blueprint, jsonify, session, request
from app.models import Post, db, User
from flask_login import current_user, login_required
import boto3
import botocore
import os

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

post_routes = Blueprint('posts', __name__)

BUCKET_NAME = os.environ.get('S3_BUCKET')
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

def upload_file_to_s3(file, acl="public-read"):
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
    print(followings[0].comments)
    return {'posts':[following.to_dict() for following in followings]}


@post_routes.route("/", methods =['POST'])
def create_post():
    data = request.get_json(force=True)
    photos = data["photos"]
    caption = data["caption"]
    new_post = Post(
        user_id = current_user.id,
        images = [],
        caption = caption
        )
    db.session.add(new_post)
    db.session.commit()
    post_id = new_post.id

    new_images = []

    for photo in photos:
        photo.filename = f"Post{post_id}/{photo.filename}"

        upload = upload_file_to_s3(photo)
        if "url" not in upload:
            return upload, 400

        url = upload["url"]
        new_images.append(url)

    new_post.images = new_images
    db.session.commit()




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
