from email.mime import image
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

class UpdatePostForm(FlaskForm):
  caption = StringField('caption', validators=[DataRequired()])
