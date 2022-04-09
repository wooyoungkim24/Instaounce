from .db import db
from app.models.post import Post
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import desc, asc
from flask_validator import ValidateURL

followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
    )



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_image = db.Column(db.String)
    bio = db.Column(db.String(150))

    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    posts = db.relationship("Post", back_populates="users")
    likes = db.relationship("Like", back_populates="users")
    comments = db.relationship("Comment", back_populates="users")

    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')
    

    def to_dict(self):
        
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_image": self.profile_image,
            "bio": self.bio,
            "updated_at": self.updated_at
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def follow(self, user):
        if not self.is_following(user) and self.id != user.id :
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id and followers.c.followed_id != self.id).count() > 0

    # def followed_posts(self):
    #     return Post.query.join(
    #         followers, (followers.c.followed_id == Post.user_id)).filter(
    #             followers.c.follower_id == self.id).order_by(
    #                 Post.updated_at.desc()).all()
    
    def followed_posts(self):

        user_posts = Post.query.filter(Post.user_id == self.id)

        following_posts = Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id)
            
        posts = user_posts.union(following_posts)
        print("RAW SQL HERE: #########", posts.order_by(desc(Post.updated_at)).all())
        ordered_posts = posts.order_by(desc(Post.updated_at)).all()
        return ordered_posts

    # def following_list(self, user):
    #     return self.followed.filter(
    #         followers.c.followed_id == user.id)

    def get_followers(self):
        return self.followers.filter(followers.c.followed_id == self.id).all()


    def to_dict_user_page(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profileImage": self.profile_image,
            "bio": self.bio,
            "updatedAt": self.updated_at,
            "posts": {post.id: post.to_dict_user_page() for post in self.posts},
            "following": {user.id: user.to_dict() for user in self.followed},
            "followers": {user.id: user.to_dict() for user in self.get_followers()}
        }

    @classmethod
    def __declare_last__(cls):
        ValidateURL(User.profile_image, False, False, True, "Please enter a valid URL")
