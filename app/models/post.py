from .db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.String(2000))
    image = db.Column(db.ARRAY(db.String), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    users = db.relationship("User", back_populates="posts")
    # comments = db.relationship(
    #     "Comment", back_populates="posts", ondelete='CASCADE')
    # likes = db.relationship(
    #     "Like", back_populates="posts", ondelete='CASCADE')
    comments = db.relationship(
        "Comment", back_populates="posts", lazy='subquery', cascade="all, delete")
    likes = db.relationship(
        "Like", back_populates="posts", cascade="all, delete")

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'image': self.image,
            'updated_at': self.updated_at,
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
            "likes": [like.to_dict() for like in self.likes],
            "users": self.users.to_dict()
        }

    def to_dict_user_page(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'caption': self.caption,
            'image': self.image,
            'updatedAt': self.updated_at,
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
            "likes": {like.id: like.to_dict() for like in self.likes}
        }
