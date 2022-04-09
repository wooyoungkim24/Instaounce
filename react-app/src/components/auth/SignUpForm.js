import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../../assets/logo.png'
import './Login-SignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profileImage, setProfileImage] = useState('')

  const [bio, setBio]= useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName, profileImage, bio));
      if (data) {
        setErrors(data)
      }
    }else{
      errors.push('Passwords do not match')
    }
  };

  const updateFirstName = (e)=>{
    setFirstName(e.target.value);
  }
  const updateLastName = (e)=>{
    setLastName(e.target.value);
  }
  const updateProfileImage = (e)=>{
    setProfileImage(e.target.value);
  }
  const updateBio = (e)=>{
    setBio(e.target.value);
  }
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="loginform-background">
          <div className="signupform-container">
              <div id="login-logo">
                <img src={logo} className="navbar-logo" alt='logo' />
              </div>
        <div id="sign-up-text">Sign up to see photos from your friends.</div>
          <div id="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        <form className="signup-form" onSubmit={onSignUp}>
          <div>
            <input
              type='text'
              name = 'username'
              value = {username}
              placeholder="Username"
              required
              onChange={updateUsername}>
            </input>
          </div>
          <div>
            <input
              type='text'
              name = 'first_name'
              placeholder="First Name"
              value = {firstName}
              required
              onChange={updateFirstName}>
            </input>
          </div>
          <div>
            <input
              type='text'
              name = 'last_name'
              placeholder="Last Name"
              value = {lastName}
              required
              onChange={updateLastName}>
            </input>
          </div>
          <div>
            <input
              type='text'
              name = 'profile_pic'
              placeholder="Profile Image"
              value = {profileImage}
              required
              onChange={updateProfileImage}>
            </input>
          </div>
          <div>
            <input
              type='text'
              name='biography'
              placeholder="Bio"
              required
              onChange={updateBio}
              value={bio}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              placeholder="Email Address"
              required
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder="Password"
              required
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              placeholder="Confirm Password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
        </div>
          <div className="sign-up-link">Have an an account? 
              <Link to="/login">
                Log in
              </Link>
          </div>
        </div>
        <footer>
        <div className="tech">
            <div id="tech" >Reactjs</div>
            <div id="tech" >Redux</div>
            <div id="tech" >Javascript</div>
            <div id="tech" >Python</div>
            <div id="tech" >Flask</div>
            <div id="tech" >SQLAlchemy</div>
            <div id="tech" >PostgreSQL</div>
            <div id="tech" >HTML</div>
            <div id="tech" >CSS</div>
        </div>
        <div id="github-menu">
            <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open" />
            <label class="menu-open-button" for="menu-open">
              <div id="github" >
                  <i class="fa-brands fa-github"></i>
              </div>
            </label>
            {/* <label class="menu-open-button" for="menu-open">
              <div id="linked-in" >
                  <i class="fa-brands fa-linkedin"></i>
              </div>
            </label> */}
            <a class="menu-item woo" target="blank" href="https://github.com/wooyoungkim24">Wooyoung Kim</a>
            <a class="menu-item wan" target="blank" href="https://github.com/wanyi886">Wan-Yi Lee</a>
            <a class="menu-item yake" target="blank" href="https://github.com/CodeWhatThouWilt">Jacob North</a>
            <a class="menu-item ana" target="blank" href="https://github.com/annvilla1998">Anabel Villalobos</a>
        </div>
        <div id="linked-in-menu">
            <input type="checkbox" href="#" class="menu-openli" name="menu-openli" id="menu-openli" />
            <label class="menu-open-buttonli" for="menu-openli">
              <div id="linked-in" >
                  <i class="fa-brands fa-linkedin"></i>
              </div>
            </label>
            <a class="menu-itemli wooli" target="blank" href="https://www.linkedin.com/in/wooyoung-kim-718618143/">Wooyoung Kim</a>
            <a class="menu-itemli wanli" target="blank" href="https://www.linkedin.com/in/wan-yi-lee/">Wan-Yi Lee</a>
            <a class="menu-itemli yakeli" target="blank" href="https://www.linkedin.com/in/jacob-north-9b1266226/">Jacob North</a>
            <a class="menu-itemli anali" target="blank" href="https://www.linkedin.com/in/anabel-villalobos-5772ab196/">Anabel Villalobos</a>
        </div>
      </footer>
    </>
  );
};

export default SignUpForm;
