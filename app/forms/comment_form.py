from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError



class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired(message="Please enter a comment")])
    