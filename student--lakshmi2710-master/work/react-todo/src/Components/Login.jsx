import React, { useState } from 'react';
import { fetchLogIn } from '../services';
import spinner from '../spinner.svg';

const Login = ({ onLogin}) => {

    const [newLoginUser, setNewLoginUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onInput = (event) => {
        setNewLoginUser(event.target.value);
    }

    const loginCreateUser = () => {

        fetchLogIn(newLoginUser)
        .then( (userInfo) => {
            onLogin(userInfo.data.username);
            setIsLoading(false); 
          })
        .catch( (err) => {
            setError(err.message);
            setIsLoading(false);
          });
      }
    

    return (
        <div id="login-page">
        <div className="title">
            Welcome to Login Page
        </div>
        <div className="login-panel">
            <h2>Please Enter UserName</h2>
            <input className="username" name="text" type="text" 
            onChange={onInput}
            value={newLoginUser} 
            />
             { isLoading ?
               <img alt="spinner" src={spinner}/> :
               <button className="create" type="button" onClick={loginCreateUser} >Login</button>
             }
           <div className="status">
            {error}
            </div>
        </div>
    </div>
    )
}

export default Login;