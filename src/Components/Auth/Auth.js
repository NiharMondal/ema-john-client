import React, { useContext, useState } from 'react';
import './Auth.css'
import firebase from "firebase/app";

import "firebase/auth";
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { Card } from '@material-ui/core';
import firebaseConfig from '../../config/firebase.config';

const Auth = () => {
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [confirmErr, setConfirmErr]=useState(false)
  const [newUser, setNewUser] = useState(false)
  const [loggedIn, setLoggedIn] = useContext(UserContext)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    conPass:'',
    error: '',
    success: false
  })
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)

  }
  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      isFormValid = isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //sign up with email and password
    user.password === user.conPass ?
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((user) => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          history.replace(from)
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        })
      : setConfirmErr(true)
    
    
    //Sign in with password and email
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          setNewUser(newUserInfo);
          setLoggedIn(newUserInfo)
          history.replace(from)
        })

        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          setConfirmErr(false)
          setUser(newUserInfo);
          
        });
    }
  
      
  
   



  }

  //Google Sign In
  const googleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email
        }
        setLoggedIn(signedInUser)
        history.replace(from)
      })
  }
  //facebook sign in
  const fbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(fbProvider)
      .then(function (res) {
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email
        }
        setLoggedIn(signedInUser)
        history.replace(from)

      })
  }

  const signInToggle = () => {
    setLoggedIn(true)
    setUser({ ...user })
  }
  const signUpToggle = () => {
    setLoggedIn(false)
    setUser({ ...user })
  }
  return (
    <div className="auth_wrapper">
      <div className="form_wrapper">
        <Card style={{ padding: '16px',marginBottom:'9px' }}>
          {loggedIn ? <h2>Login</h2> : <h2>Create an account</h2>}
          <form onSubmit={handleSubmit} autoComplete="off">
            {!loggedIn && <TextField
              onBlur={handleBlur}
              type="text"
              label="Name"
              name="name"
              fullWidth
              required
            />}
            <TextField
              onBlur={handleBlur}

              label="Email"
              name="email"

              fullWidth
              required
            />
            <TextField
              onBlur={handleBlur}
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
            />
            {!loggedIn && <TextField
              onBlur={handleBlur}
              type="password"
              label="Confirm Password"
              name="conPass"
              fullWidth
              required
            />}
            {
              loggedIn ?
                <input style={{ marginTop: '5px', width: '100%' }} type="submit" value="Login" />
                : <input style={{ marginTop: '5px', width: '100%' }} type="submit" value="Sign up" />
            }
            {
              confirmErr && !loggedIn ? <p className="text-danger text-center">Password doesn't match</p> : 
              <p className="text-danger text-center">{user. error}</p>
            } 
            
        
            
            {
              user.success && loggedIn && <p style={{ color: 'green' }}>User {newUser ? "Logged in" : "Created"} successfully</p> 
            }

            {
              user.success && !loggedIn && <p style={{ color: 'green' }}>User Created successfully</p> 
            }
          </form>
          {
            loggedIn ?
              <>
                <span style={{ textAlign: 'center' }}>Don't have an account? </span>
                <span
                  onClick={signUpToggle}
                  style={{ color: "orange", cursor: "pointer" }}>
                  Signup
                  </span>
              </> :
              <>
                <span style={{ textAlign: 'center' }}>Already have an account? </span>
                <span onClick={signInToggle}
                  style={{ color: "orange", cursor: "pointer" }}>
                  Login
                   </span>
              </>
          }
        </Card>
        <h6 className="google_login" onClick={googleSignin}>Contineu with Google</h6>
        <h6 className="facebook_login" onClick={fbSignIn}>Contineu with Facebook</h6>
      </div>
    </div>
  );
};

export default Auth;