from unittest import TestCase

from app import app
from models import db, User, Post, Tag, DEFAULT_IMAGE_URL


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test-mtom'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"

# with app.app_context():
#     db.drop_all()
#     db.create_all()
    
class UserViewsTestCase(TestCase):
    """Test for views for Users"""
    
    def setUp(self):
        """Add sample user."""
        with app.app_context():
            db.drop_all()
            db.create_all()
            
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
    
    # Root Route
    
    def test_homepage(self):
        with self.client:
            response = self.client.get('/')
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn('Recent Posts', html)
          
    # Users Routes
                      
    def test_users_list(self):
        with self.client:
            response = self.client.get('/users')
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
            
# Posts Routes

class PostViewsTestCase(TestCase):
    """Test for views for Posts"""

    def setUp(self):
        """Add sample user."""
        with app.app_context():
            db.drop_all()
            db.create_all()
            
            User.query.delete()
            
            user = User(first_name="TestFirstName", 
                        last_name="TestLastName", 
                        image_url=DEFAULT_IMAGE_URL)
            
            post = Post(title="First Post",
                        content="This is my first post",
                        user_id=1)
            db.session.add(user)
            db.session.add(post)
            db.session.commit()
            
            self.client = app.test_client()

        
    def tearDown(self):
        """Clean up any bad transaction."""
        with app.app_context():
            db.session.rollback()
    
    def test_new_post(self):
        with self.client:
            response = self.client.get('/users/1/posts/new')
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn('Add Post for TestFirstName TestLastName', html)
            
    def test_user_post(self):
        with self.client:
            response = self.client.get('/posts/1') 
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn('First Post', html)
            
    def test_edit_post(self):
        with self.client:
            response = self.client.get('/posts/1/edit') 
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn('Edit Post', html)
            
class TagsViewsTestCase(TestCase):
    """Test for views for Posts"""

    def setUp(self):
        """Add sample user."""
        with app.app_context():
            db.drop_all()
            db.create_all()
            
            User.query.delete()
            
            user = User(first_name="TestFirstName", 
                        last_name="TestLastName", 
                        image_url=DEFAULT_IMAGE_URL)
            
            post = Post(title="First Post",
                        content="This is my first post",
                        user_id=1)
            
            tag = Tag(name="TestTagName")
            
            db.session.add_all([user, post, tag])
            
            db.session.commit()
            
            self.client = app.test_client()

        
    def tearDown(self):
        """Clean up any bad transaction."""
        with app.app_context():
            db.session.rollback()
            
    def test_show_tags(self):
        """Test to show list of tags"""
        with self.client:
            response = self.client.get('/tags')
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn('Tags List', html)
            
    def test_show_tag(self):
        """Test to show specific tag"""
        with self.client:
            response = self.client.get('/tags/1')
            tag = Tag.query.get_or_404(1)
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn(f'{tag.name}', html)
    
    def test_new_tag(self):
        """Test to show new tag form"""
        with self.client:
            response = self.client.get('/tags/new')
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn('Create a Tag', html)
            
    def test_new_tag(self):
        """Test to show edit tag form"""
        with self.client:
            response = self.client.get('/tags/1/edit')
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn('Edit a Tag', html)