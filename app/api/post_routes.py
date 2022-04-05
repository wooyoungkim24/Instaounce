from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import Post, db, User, Like
from flask_login import current_user, login_required


post_routes = Blueprint('posts', __name__)


@post_routes.route("/")
@login_required
def read_posts():

    user = User.query.get(current_user.get_id())
    # print('currentId', user)
    # posts = Post.query.filter(user.is_following(Post.user_id)).all()
    followings = user.followed_posts()
    print(followings[0].comments)
    return {'posts':[following.to_dict() for following in followings]}

@post_routes.route("/<id>/likes", methods=["POST"])
def create_like(id):
    post_id = id
    new_like = Like(
        user_id = current_user.id,
        post_id = post_id
    )
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()



# @post_routes.route("/", methods =['POST'])
# def create_post():
