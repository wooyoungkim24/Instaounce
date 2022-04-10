from email.mime import image
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

class UpdatePostForm(FlaskForm):
  caption = TextAreaField('caption', validators=[DataRequired()])
  updated_at = DateTimeField('updated_at')
