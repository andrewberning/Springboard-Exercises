"""Models for Blogly."""
import datetime
from flask_sqlalchemy import SQLAlchemy




db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"

def connect_db(app):
    """Connect to db."""
    
    db.app = app
    db.init_app(app)
    
class User(db.Model):
    """User Model."""
  
    __tablename__ = "users"
    
    def __repr__(self):
        return f"<User id={self.id} first_name={self.first_name} last_name={self.last_name} image_url={self.image_url}"
  
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)
    
    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")
    
    @property
    def full_name(self):
        """Return full name of user."""
        return f"{self.first_name} {self.last_name}"
      
class Post(db.Model):
    """Post Model"""
    
    __tablename__ = "posts"
    
    def __repr__(self):
        return f"<Post id={self.id} title={self.title} content={self.content} created_at={self.created_at} user_id={self.user_id}"
      
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, 
                           nullable=False, 
                           default=datetime.datetime.now)
    user_id = db.Column(db.Integer, 
                        db.ForeignKey('users.id'),
                        nullable=False)
    
    @property
    def friendly_date(self):
        """Return nicely-formatted date."""
        return self.created_at.strftime("%a %b %-d %Y, %-I:%M %p")
           
class Tag(db.Model):
    """Tag Model"""
    
    __tablename__ = "tags"
    
    def __repr__(self):
        return f"<Tag id={self.id} name={self.name}"
      
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    
    posts = db.relationship('Post',
                            secondary='posts_tags',
                            # cascade="all, delete-orphan", 
                            backref='tags')

class PostTag(db.Model):
    """PostTag Model"""
    
    __tablename__ = "posts_tags"
    
    def __repr__(self):
        return f"<PostTag post_id={self.post_id} tag_id{self.tag_id}"
    
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)