from flask import Blueprint, jsonify, session, request
from app.models import Post, db, User
from flask_login import current_user


post_routes = Blueprint('post', __name__)


@post_routes.route("/")
def read_posts():
    user = User.query.get(current_user.id)

    posts = Post.query.filter(user.is_following(Post.user_id)).all

    return {'posts':[post.to_dict() for post in posts]}
