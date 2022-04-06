from flask import Blueprint, jsonify, session, request
from app.models import Post, db, User, Like
from flask_login import current_user, login_required


likes_routes = Blueprint('likes', __name__)


# @likes_routes.route("/")
# # @login_required
# # # def read_likes():




