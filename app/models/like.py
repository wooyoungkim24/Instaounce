from .db import db
from datetime import datetime

class Like(db.Model):
  __tablename__= 'likes'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
  created_at = db.Column(db.DateTime, default = datetime.utcnow)
  updated_at = db.Column(db.DateTime, default = datetime.utcnow)

  users = db.relationship("User", back_populates="likes")
  posts = db.relationship("Post", back_populates="likes")


  def to_dict(self):
    return{
      "id": self.id,
      "user_id":self.user_id,
      "post_id":self.post_id,
      "updated_at":self.updated_at,
      # "users":self.users,
      # "posts":self.posts
    }
