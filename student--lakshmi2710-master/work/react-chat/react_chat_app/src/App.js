import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './ReactComponents/Login'
import Logout from './ReactComponents/Logout'
import ChatApp from './ReactComponents/ChatApp'
import { fetchLoginStatus } from './services'


function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setUserState({
          isLoggedIn: true
        });
        setUsername(userInfo.username);
      })
      .catch((err) => {
        setError(err.error);
        setUserState({
          isLoggedIn: false
        })

      });

  }, []);


  const login = () => {
    setUserState({
      isLoggedIn: true,
    });
    setUsername(username);
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  let pageBody;
  if (userState.isLoggedIn) {
    pageBody = <ChatApp username={username} error={error} />;
  }
  else {
    pageBody = <Login onLogin={login} />;
  }

  return (
    <div className="App">
      <Logout user={userState} onLogout={logout} />
      {pageBody}
    </div>
  );
}

export default App;