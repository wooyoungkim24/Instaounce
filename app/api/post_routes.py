from flask import Blueprint, jsonify, session, request
from app.models import Post, db, User
from flask_login import current_user, login_required


post_routes = Blueprint('posts', __name__)


@post_routes.route("/")

def read_posts():
    # user = User.query.get(1)
    # return user.to_dict()


    # user = User.query.get(current_user.id)

    print('testing user',current_user)
    user = User.query.get(1)
    return user.to_dict()
    # posts = Post.query.filter(user.is_following(Post.user_id)).all

    # return {'posts':[post.to_dict() for post in posts]}


# @post_routes.route("/", methods =['POST'])
# def create_post():
