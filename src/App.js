import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();

  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user);
    }).catch(error =>{
      console.error('error', error)
    })
  }

  const handleGoogleSignOut = () => {
    signOut(auth)
    .then(() =>{
      setUser({});
    }).catch(error =>{
      console.error(error);
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      setUser(user)
    })
    .catch(error => {
      console.error(error);
    })
  }

  const handleGithubSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
  }

  return (
    <div className="App">
      {
        !user.uid ? <>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>GitHub Sign In</button>
        </>
      : <>
      <button onClick={handleGoogleSignOut}>Google Sign Out</button>   
      <button onClick={handleGithubSignOut}>Github Sign Out</button> </>   }   
      <h2>Name: {user.displayName}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
