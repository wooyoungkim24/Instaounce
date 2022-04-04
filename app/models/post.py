
from .db import db

class Post(db.Model):
  __tablename__= 'posts'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
  caption = db.Column(db.String(2000))
  image = db.Column(db.ARRAY(db.String), nullable=False)
  created_at = db.Column(db.DateTime)
  updated_at = db.Column(db.DateTime)

  users = db.relationship("User", back_populates="posts")
  comments = db.relationship("Comment", back_populates="posts")
  likes = db.relationship("Like", back_populates="posts")
