import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../../assets/logo.png'
import './Login-SignUp.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async(e) => {
    e.preventDefault();
    const demoEmail = 'demo@aa.io';
    const demoPwd = 'password'
    await dispatch(login(demoEmail, demoPwd))

  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="loginform-background">
        <div className="loginform-container">
            <div id="login-logo">
              <img src={logo} className="navbar-logo" alt='logo' />
            </div>
              <form className="login-form" onSubmit={onLogin}>
                <div id="errors">
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
                <div>
                  <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div>
                  <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                    />
                </div>
                  <button type='submit'>Log In</button>
                  <button type="button" onClick={demoLogin}>Log In As Demo User</button>
              </form>
        </div>
        <div className="sign-up-link">Don't have an account?
            <Link to="/sign-up">
              Sign up
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


export default LoginForm;
