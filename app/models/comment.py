from .db import db



class Comment(db.Model):
  __tablename__= 'comments'
  id = db.Column(db.Integer, primary_key=True)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  content = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime)
  updated_at = db.Column(db.DateTime)

  posts = db.relationship("Post", back_populates="comments")
  users = db.relationship("User", back_populates="comments")
