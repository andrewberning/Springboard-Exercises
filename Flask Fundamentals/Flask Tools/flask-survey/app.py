from flask import Flask, session, request, render_template, redirect, flash, make_response
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

CURRENT_SURVEY_KEY = 'current_surevey'
RESPONSES_KEY = "responses"

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def show_pick_survey_form():
    """ Show pick surevey form."""
  
    return render_template('pick_survey.html', surveys=surveys)
  
@app.route('/', methods=['POST'])
def pick_survey():
    """Select a survey"""
    
    survey_id = request.form['survey_code']
    
    #dont' let them re-take a survey until cookie times out
    if request.cookies.get(f"completed_{survey_id}"):
        return render_template("already-done.html")
      
    survey = surveys[survey_id]
    session[CURRENT_SURVEY_KEY] = survey_id

    return render_template('survey_start.html', survey=survey)
  
@app.route('/begin', methods=['POST'])
def start_survey():
    """Clear the session of responses."""
    
    session[RESPONSES_KEY] = []

    return redirect("/questions/0")  
  
  
@app.route('/home', methods=['POST'])
def send_home():
    """ Clear the session and redirect back to root"""
    
    session[RESPONSES_KEY] = []
    
    return redirect('/')
  
@app.route('/answer', methods=['POST'])
def handle_question():
    """Save response and redirect to next question."""
    
    responses = session[RESPONSES_KEY]
    survey_code = session[CURRENT_SURVEY_KEY]
    
    try:
        # get the response choice
        choice = request.form['answer']
        text = request.form.get('text', '')
    
        # add this response to the session        
        responses.append({'choice': choice, 'text': text})
        session[RESPONSES_KEY] = responses
        survey = surveys[survey_code]
        
        if (len(responses) == len(survey.questions)):
            # if all questions are answered, redirect user to thank you page
            return redirect('/complete')
        
        else:
            return redirect(f"/questions/{len(responses)}")
          
    except:
        flash(f"Please choose an answer.")
        return redirect(f"/questions/{len(responses)}")


@app.route('/questions/<int:qid>')
def show_question(qid):
    """ Show the question"""
    
    responses = session.get(RESPONSES_KEY)
    survey_code = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_code]
    
    if (responses is None):
        # trying to access question page too soon
        return redirect('/')
      
    if(len(responses) == len(survey.questions)):
        # they have answered all the questions! Thank them.
        return redirect('/complete')
      
    if(len(responses) != qid):
        # trying to access questions out of order.
        flash(f"Invalid qustion id: {qid}.")
        return redirect(f"/questions/{len(responses)}")
    
    question = survey.questions[qid]
  
    return render_template('question.html', question_num=qid, question=question, survey=survey)
  
@app.route('/complete')
def complete():
    """Survey complete. Show completion page."""
    responses = session[RESPONSES_KEY]
    survey_id = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_id]
    
    html = render_template("completion.html",
                           survey=survey,
                           responses=responses)

    # Set cookie noting this survey is done so they can't re-do it
    response = make_response(html)
    response.set_cookie(f"completed_{survey_id}", "yes", max_age=60)
    return response