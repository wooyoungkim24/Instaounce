from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def bio_length_check(form,field): 
    bio = field.data
    if len(bio) > 150:
        raise ValidationError('Bio needs to be less than 150 characters.')

def first_name_length(form,field):
    first_name = field.data
    if len(first_name) > 25:
        raise ValidationError('First name needs to be less than 25 characters.')

def last_name_length(form,field):
    last_name = field.data
    if len(last_name) > 25:
        raise ValidationError('Last name needs to be less than 25 characters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(message="Please enter a valid email address"), user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('First Name', validators = [DataRequired(), first_name_length])
    last_name = StringField('Last Name', validators = [DataRequired(), last_name_length])
    profile_image = StringField('Image URL', validators=[DataRequired(), URL(require_tld=True,message="Please enter a valid URL")])
    bio = TextAreaField('Biography', validators=[bio_length_check])
