import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomePage from './Components/WelcomePage'
import Logout from './Components/Logout'
import PatientPortal from './Components/PatientPortal'
import DoctorPortal from './Components/DoctorPortal'
import { fetchLoginStatus } from './services'

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setUserState({
          isLoggedIn: true
        });
        setUserName(userInfo.userName);
        setUserType(userInfo.userType);
      })
      .catch((err) => {
        setError(err.error);
        setUserState({
          isLoggedIn: false
        })
      });
  }, []);

  const onLogin = (userInfo) => {
    setUserState({
      isLoggedIn: true,
    });
    setUserName(userInfo.userName);
    setUserType(userInfo.userType);
  };

  const onlogout = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  let pageBody;
  if (userState.isLoggedIn && userType == "patient") {
    pageBody = <PatientPortal userName={userName} error={error} />;
  }
  else if(userState.isLoggedIn && userType == "doctor") {
    pageBody = <DoctorPortal userName={userName} error={error} />;
  }
  else {
    pageBody = <WelcomePage  onLogin = {onLogin}/>;
  }


  return (
    <div className="App">
      <Logout user={userState} onLogout={onlogout} />
      {pageBody}
    </div>
  );
}

export default App;