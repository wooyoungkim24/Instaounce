import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomeFeed from './components/HomeFeed';
// import UsersList from './components/UsersList';
import UserProfile from './components/UserProfile';
import CommentCard from './components/CommentCard';
import ExplorePage from './components/ExplorePage';
import PageNotFound from './components/PageNotFound';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {sessionUser &&
        <NavBar user={sessionUser} />
      }
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomeFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/comments/' exact={true}>
          <CommentCard />
        </ProtectedRoute>
        <ProtectedRoute path='/explore' exact={true}>
          <ExplorePage />
        </ProtectedRoute>
        <Route path='/'>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
