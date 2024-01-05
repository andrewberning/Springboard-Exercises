"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/mtom-blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret"

connect_db(app)

with app.app_context():
    db.create_all()

# Root Route

@app.route('/')
def root():
    """Show recent list of posts, most-recent first."""
    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()
    return render_template('/posts/homepage.html', posts=posts)

# Users Routes    
@app.route('/users')
def list_users():
    """List all of the users."""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('/users/users-list.html', users=users)
  
@app.route('/users/new')
def new_users_form():
    """Show add new user form."""
    return render_template('/users/new-user.html')
  
@app.route('/users/new', methods=["POST"])
def new_users_submit():
    """Add new user and redirect to users list."""
    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        image_url=request.form['image_url'] or None)
    
    db.session.add(new_user)
    db.session.commit()
    flash(f"User {new_user.full_name} added.")
    
    return redirect('/users')
  
@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show info about a specific user."""
    user = User.query.get_or_404(user_id)
    return render_template('/users/show-user.html', user=user)
  
@app.route('/users/<int:user_id>/edit')
def edit_user_form(user_id):
    """Show a form to edit an existing user."""
    user = User.query.get_or_404(user_id)
    return render_template('/users/edit-user.html', user=user)
  
@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user_submit(user_id):
    """Handle form submission for updating an existing user"""
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name'],
    user.last_name = request.form['last_name'],
    user.image_url = request.form['image_url']
    
    db.session.add(user)
    db.session.commit()
    
    return redirect('/users')
  
@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Handle form submission for deleting an existing user"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    return redirect('/users')
  
  
# POSTS ROUTES

@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    """Show add new post form."""
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('/posts/new-post.html', user=user, tags=tags)
                           
@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def submit_new_post(user_id):
    """Handle form submission to add a new post for a specific user and redirect to user detail page."""
    user = User.query.get_or_404(user_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    new_post = Post(
        title = request.form['title'],
        content = request.form['content'],
        user = user,
        tags = tags
    )
    
    db.session.add(new_post)
    db.session.commit()
    flash(f"Post '{new_post.title}' added.")
    
    return redirect(f"/users/{user_id}")
  
@app.route('/posts/<int:post_id>')
def show_user_post(post_id):
    """Show post info from a specific user and show buttons to edit and delete post."""
    post = Post.query.get_or_404(post_id)
    return render_template('/posts/show-post.html', post=post)
                           
@app.route('/posts/<int:post_id>/edit')
def edit_post_form(post_id):
    """Show form to edit a post and to cancel (back to user page)."""   
    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()
    return render_template('/posts/edit-post.html', post=post, tags=tags)
  
@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post_submit(post_id):
    """Handle editing of a post and redirect back to post view."""
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    
    db.session.add(post)
    db.session.commit()
    flash(f"Post '{post.title}' edited.")
    
    return redirect(f"/users/{post.user_id}")
  
@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    """Delete the post."""
    post = Post.query.get_or_404(post_id)
    
    db.session.delete(post)
    db.session.commit()
    flash(f"Post '{post.title}' deleted.")
    
    return redirect(f"/users/{post.user_id}")
  
# TAGS ROUTES

@app.route('/tags')
def show_tags_list():
    """Show a page with info on all tags."""
    tags = Tag.query.all()
    return render_template('/tags/tags-list.html', tags=tags)
  
@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    """Show detail about a tag with links to edit form and delete."""
    tag = Tag.query.get_or_404(tag_id)
    return render_template('/tags/show-tag.html', tag=tag)

@app.route('/tags/new')
def new_tag_form():
    """Show new tag form"""
    posts = Post.query.all()
    return render_template('/tags/new-tag.html', posts=posts)
  
@app.route('/tags/new', methods=["POST"])
def new_tag_submit():
    """Handle new tag submit and redirect to tags list"""
    post_ids = [int(num) for num in request.form.getlist("posts")]
    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    new_tag = Tag(name=request.form['name'], posts=posts)
    
    db.session.add(new_tag)
    db.session.commit()
    flash(f"Tag '{new_tag.name}' added.")
    
    return redirect('/tags')

@app.route('/tags/<int:tag_id>/edit')
def edit_tag_form(tag_id):
    """Show edit form for a tag"""
    tag = Tag.query.get_or_404(tag_id)
    posts = Post.query.all()
    return render_template('/tags/edit-tag.html', tag=tag, posts=posts) 

@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag_sumbit(tag_id):
    """Handle editing of a tag and redirect back to tag view."""
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']
    post_ids = [int(num) for num in request.form.getlist("posts")]
    tag.posts = Post.query.filter(Post.id.in_(post_ids)).all()
    
    db.session.add(tag)
    db.session.commit()
    flash(f"Tag '{tag.name}' edited.")
    
    return redirect(f"/tags/{tag_id}")
  
@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    """Delete the tag."""
    tag = Tag.query.get_or_404(tag_id)
      
    db.session.delete(tag)
    db.session.commit()
    flash(f"Tag '{tag.name}' deleted.")
      
    return redirect('/tags')
    
