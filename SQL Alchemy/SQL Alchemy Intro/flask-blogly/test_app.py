from unittest import TestCase

from app import app
from models import db, User


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"

with app.app_context():
    db.drop_all()
    db.create_all()
    
    class UserViewsTestCase(TestCase):
        """Test for views for Users"""
        
        def setUp(self):
            """Add sample user."""
            with app.app_context():
                
                User.query.delete()
                
                user = User(first_name="TestFirstName", last_name="TestLastName", image_url=DEFAULT_IMAGE_URL)
                db.session.add(user)
                db.session.commit()
                
                self.client = app.test_client()
                self.user_id = user.id
            
        def tearDown(self):
            """Clean up any bad transaction."""
            with app.app_context():
                db.session.rollback()
                
        def test_list_users(self):
            with self.client:
                response = self.client.get('/users')
                html = response.get_data(as_text=True)
                
                self.assertEqual(response.status_code, 200)
                self.assertIn('TestFirstName', html)
                
        def test_redirect_list_users(self):
            with self.client:
                response = self.client.get('/')
                self.assertEqual(response.status_code, 302)
                self.assertEqual(response.location, '/users')
                
        def test_redirect_list_users_followed(self):
            with self.client:
                response = self.client.get('/', follow_redirects=True)
                html = response.get_data(as_text=True)
                
                self.assertEqual(response.status_code, 200)
                self.assertIn('TestFirstName', html)
            
        def test_new_user(self):
            with self.client:
                response = self.client.get('/users/new')        
                html = response.get_data(as_text=True)
                
                self.assertEqual(response.status_code, 200)
                self.assertIn('<h1>Create a user</h1>', html)
                
        def test_new_user_submit(self):
            with self.client:
                data = {"first_name":"TestFirstName2", "last_name":"TestLastName2", "image_url":DEFAULT_IMAGE_URL}
                response = self.client.post("/users/new", data=data, follow_redirects=True)
                html = response.get_data(as_text=True)

                self.assertEqual(response.status_code, 200)
                self.assertIn('TestFirstName2 TestLastName2', html)