from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Post, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict_user_page()

@user_routes.route('/<int:id>/posts')
@login_required
def user_posts(id):
    posts = Post.query.filter(Post.user_id == current_user.id).all()
    return {'posts': [post.to_dict() for post in posts]}


@user_routes.route('/<int:id>/followers', methods=["POST", "DELETE"])
@login_required
def user_follow(id):
    if request.method == "POST":
        follow_user = User.query.get(id)
        user = User.query.get(current_user.id)
        
        user.follow(follow_user)
        db.session.commit()
        return {"currentUser": user.to_dict(), "user": follow_user.to_dict()}
    
    elif request.method == "DELETE":
        follow_user = User.query.get(id)
        user = User.query.get(current_user.id)

        user.unfollow(follow_user)
        db.session.commit()
        return {"currentUser": user.id, "user": follow_user.id}
