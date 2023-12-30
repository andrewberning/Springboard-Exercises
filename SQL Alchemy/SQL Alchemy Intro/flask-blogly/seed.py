"""Seed file to make simple data for users db."""

from models import User, db
from app import app

# Create all tables
with app.app_context():
    db.drop_all()
    db.create_all()
    # If table is NOT empty, empty it
    User.query.delete()

    # Add users
    sally = User(first_name='Sally', last_name='Thompson')
    derek = User(first_name='Derek', last_name='Winters')
    jorge = User(first_name='Jorge', last_name='Gonzalez')

    # Add objects to session
    db.session.add(sally)
    db.session.add(derek)
    db.session.add(jorge)

    # Commit
    db.session.commit()
