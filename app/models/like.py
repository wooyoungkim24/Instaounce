from .db import db

class Like(db.Model):
  __tablename__= 'likes'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
  post_id = db.Column(db.Integer, ForeignKey("posts.id"), nullable=False)
  created_at = db.Column(db.DateTime)
  updated_at = db.Column(db.DateTime)

  users = db.relationship("User", back_populates="likes")
  posts = db.relationship("Post", back_populates="likes")
