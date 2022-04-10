from .db import db
from datetime import datetime



class Comment(db.Model):
  __tablename__= 'comments'
  id = db.Column(db.Integer, primary_key=True)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  content = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, default = datetime.utcnow)
  updated_at = db.Column(db.DateTime, default = datetime.utcnow)

  posts = db.relationship("Post", back_populates="comments", lazy='subquery')
  users = db.relationship("User", back_populates="comments", lazy='subquery')

  def to_dict(self):
    return {
      "id":self.id,
      "post_id":self.post_id,
      "user_id":self.user_id,
      "content":self.content,
      "updated_at":self.updated_at,
      # "posts":self.posts,
      "users":self.users.to_dict()
    }
