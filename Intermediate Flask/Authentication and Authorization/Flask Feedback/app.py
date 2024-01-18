"""Flask App for Flask Feedback"""

from flask import Flask, render_template, redirect, session
from werkzeug.exceptions import Unauthorized

from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, DeleteForm

def create_app(db_name, testing=False):
    
    ##### CONFIG #####
    
    app = Flask(__name__)
    
    app.testing = testing
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql:///{db_name}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SECRET_KEY'] = "secret"
    
    ##### ROUTES #####
    
    @app.route('/')
    def index():
        """Redirtect to register"""
        
        return redirect("/register")
      
    @app.route('/register', methods = ['GET', 'POST'])
    def register():
        """Register/Create a user: make a form and handle submission."""
        
        # if usersname is in session, redirect to users/'username'.
        if "username" in session:
            return redirect(f"/users/{session['username']}")
        
        # bring in register form  
        form = RegisterForm()
        
        # if form submited, validate data.
        if form.validate_on_submit():
            username = form.username.data
            password = form.password.data
            first_name = form.first_name.data
            last_name = form.last_name.data
            email = form.email.data
            
            # register user using class method
            user = User.register(username, password, first_name, last_name, email)
            
            # commit the session to db and in session,
            # put user.username in the session and redirect to users/<username>
            db.session.commit()
            session['username'] = user.username
            print(f"##### {session['username']} #####")
            
            return redirect(f"/users/{user.username}")
        
        # else render register page    
        else:    
            return render_template(f"/users/register.html", form=form)
     
     
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        """Handle login: make a form and handle login."""
        
        # if usersname is in session, redirect to users/<username>.
        if "username" in session:
          print(f"##### {session['username']} #####")
          return redirect(f"users/{session['username']}")
        
        # bring in login form
        form = LoginForm()
        
        # if form submitted, validate data
        if form.validate_on_submit():
            password = form.password.data
            username = form.username.data
            
            # authenticate user with class method
            user = User.authenticate(username, password)
            
            # if user is authenticated,
            # put user.username in the session and redirect to users/<username>
            # else pass error to form and return back to login page.
            if user:
                session['username'] = user.username
                print(f"##### {session['username']} #####")
                return redirect(f"/users/{user.username}")
            else:
                form.username.errors = ["Invalid username/password."]
                return render_template("users/login.html", form=form)
        
        # render login template
        return render_template("users/login.html", form=form)
      
    @app.route("/logout")
    def logout():
        """Logout route."""

        session.pop("username")
        print(f"##### {session} #####")
        return redirect("/login")
    
    
    @app.route('/users/<username>', methods=['GET'])
    def secret(username):
        """Show page for logged-in-user"""
        
        if "username" not in session or username != session['username']:
            raise Unauthorized()
          
        user = User.query.get(username)
        form = DeleteForm()
        
        return render_template("users/show.html", user=user, form=form)
      
    @app.route('/users/<username>/delete', methods=['POST'])
    def remove_user(username):
        """Remove user and redirect to login"""
        
        if "username" not in session or username != session['username']:
            raise Unauthorized()
        
        user = User.query.get(username)
        db.session.delete(user)
        db.session.commit()
        session.pop("username")
        
        return redirect("/login")
      
    @app.route('/users/<username>/feedback/new', methods=['GET', 'POST'])
    def new_feedback(username):
        """Show add-feedback form and handle submit"""
        
        if "username" not in session or username != session['username']:
            raise Unauthorized()
          
        form = FeedbackForm()
        
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            
            feedback = Feedback(
                title=title,
                content=content,
                username=username,
            )
            
            db.session.add(feedback)
            db.session.commit()
            
            return redirect(f"/users/{feedback.username}")
        
        else:
            return render_template("feedback/new.html", form=form)
          
    @app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
    def update_feedback(feedback_id):
        """Show update-feedback form and handle submit"""
        
        feedback = Feedback.query.get(feedback_id)
        
        if "username" not in session or feedback.username != session['username']:
            raise Unauthorized()
          
        form = FeedbackForm(obj=feedback)
        
        if form.validate_on_submit():
            feedback.title = form.title.data
            feedback.content = form.content.data
            
            db.session.commit()
            
            return redirect(f"/users/{feedback.username}")
          
        return render_template("/feedback/edit.html", form=form, feedback=feedback)
      
    @app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
    def delete_feedback(feedback_id):
        """Delete feedback"""
        
        feedback = Feedback.query.get(feedback_id)
        
        if "username" not in session or feedback.username != session['username']:
            raise Unauthorized()
          
        form = DeleteForm()
        
        if form.validate_on_submit():
            db.session.delete(feedback)
            db.session.commit()
        
        return redirect(f"/users/{feedback.username}")
      
      
    # end of create_app()
    return app
  
  
########## CREATE APP & CONNECT DB ##########  
  
if __name__ == '__main__':
    app = create_app('flask-feedback')
    connect_db(app)
    app.run(debug=True)  