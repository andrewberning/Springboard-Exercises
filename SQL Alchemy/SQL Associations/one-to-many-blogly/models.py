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
  
    id = db.Column(db.Integer,
                   primary_key=True)
    first_name = db.Column(db.Text,
                           nullable=False)
    last_name = db.Column(db.Text,
                           nullable=False)
    image_url = db.Column(db.Text,
                          nullable=False,
                          default=DEFAULT_IMAGE_URL)
    
    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")
    
    @property
    def full_name(self):
        """Return full name of user."""
        return f"{self.first_name} {self.last_name}"
      
class Post(db.Model):
    """Post Model"""
    
    __tablename__="posts"
    
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