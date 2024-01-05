"""Seed file to make simple data for blogly3 db."""

from models import db, User, Post, Tag, PostTag
from app import app

# Create all tables
with app.app_context():
    db.drop_all()
    db.create_all()
    # If table is NOT empty, empty it
    User.query.delete()
    Post.query.delete()
    Tag.query.delete()
    PostTag.query.delete()

    # Sample users
    user1 = User(first_name='Sally', last_name='Thompson')
    user2 = User(first_name='Derek', last_name='Winters')
    user3 = User(first_name='Jorge', last_name='Gonzalez')
    
    # Sample posts
    post1 = Post(title='First Post', 
                      content='This is my first post', 
                      user=user1)
    post2 = Post(title='This is awesome!', 
                      content='The new feature is a game changer!', 
                      user=user2)
    post3 = Post(title='Great News Everyone!', 
                      content='The album is complete and ready for download!', 
                      user=user3)
    
    # Sample tags
    tag1 = Tag(name='Fun')
    tag2= Tag(name='Fire')
    tag3 = Tag(name='Shazam')
    
    # Sample Post-Tag Relationships
    # post_tag1 = PostTag(post_id=post1, tag_id=tag1)
    post1.tags.append(tag1)
    # post_tag2 = PostTag(post_id=post2, tag_id=tag2)
    post2.tags.append(tag2)
    # post_tag3 = PostTag(post_id=post3, tag_id=tag3)
    post3.tags.append(tag3)

    # Add objects to session
    obj_list = [user1, user2, user3, post1, post2, post3, tag1, tag2, tag3]
    
    db.session.add_all(obj_list)
    
    # Commit
    db.session.commit()
