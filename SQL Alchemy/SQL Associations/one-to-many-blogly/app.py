"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from models import db, connect_db, User, Post

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly2'
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
    
    return redirect('/users')
  
@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show info about a specific user."""
    user = User.query.get_or_404(user_id)
    return render_template('/users/user.html', user=user)
  
@app.route('/users/<int:user_id>/edit')
def edit_user_form(user_id):
    """Show a form to edit an existing user."""
    user = User.query.get_or_404(user_id)
    return render_template('/users/edit.html', user=user)
  
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
    return render_template('/posts/new-post.html', user=user)
                           
@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def submit_new_post(user_id):
    """Handle form submission to add a new post for a specific user and redirect to user detail page."""
    user = User.query.get_or_404(user_id)
    new_post = Post(
        title = request.form['title'],
        content = request.form['content'],
        user = user
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
    return render_template('/posts/edit.html', post=post)
  
@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post_submit(post_id):
    """Handle editing of a post and redirect back to post view."""
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    
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