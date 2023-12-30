"""Blogly application."""

from flask import Flask, request, render_template, redirect
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret"

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/')
def redirect_list_users():
    """Redirect to list of users"""
    return redirect('/users')
    
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