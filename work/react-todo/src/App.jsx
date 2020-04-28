import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login'
import Logout from './Components/Logout'
import ToDoListPage from './Components/ToDoListPage'

import { fetchLoginStatus} from './services'


function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect( () => {
    fetchLoginStatus()
    .then( userinfo => {
      
      setUserState({
        isLoggedIn: true
      });
      setUsername( userinfo.data.username);
    })
    .catch( (err) => {
      setError(err.error);
      setUserState({
        isLoggedIn: false
      })
  
    });

  }, []);

  const login = (username) => {
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
  if(userState.isLoggedIn){
    pageBody = <ToDoListPage username={ username }/>;
  }
  else{
    pageBody = <Login onLogin={ login }/>;
  }

  return (
    <div className="App">
      <Logout user={userState} onLogout={ logout }/>
      {pageBody}
    </div>
  );
}

export default App;