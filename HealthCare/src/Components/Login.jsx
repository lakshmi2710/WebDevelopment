import React, { useState } from 'react';
import { fetchDoctorLogIn, fetchPatientLogIn } from '../services';
import DoctorLoginImg from '../img/img2.jpg'
import PatientLoginImg from '../img/img10.jpg'


const Login = ({ user, onLogin }) => {

  const [newLoginUser, setNewLoginUser] = useState('');
  const [error, setError] = useState('');

  const onInput = (event) => {
    const name = event.target.value
    setNewLoginUser(name.toUpperCase());
  }

  const loginCreatePatient = () => {
    fetchPatientLogIn(newLoginUser)
      .then((userInfo) => {
        onLogin(userInfo);

      })
      .catch((err) => {
        setError(err.error);

      });
  }

  const loginCreateDoctor = () => {
    fetchDoctorLogIn(newLoginUser)
      .then((userInfo) => {
        onLogin(userInfo);
      })
      .catch((err) => {
        setError(err.error);

      });
  }

  return (
    <div className='bg'>
      {user === "Doctor" ?
        <img src={DoctorLoginImg} alt="bg" class="bg" /> :
        <img src={PatientLoginImg} alt="bg" class="bg" />
      }
      <div className="title">
        {user === "Doctor" ?
          "Welcome Doctor, Please Login with your details" :
          "Welcome, Please Login with your details! We are always here to help you"
        }
      </div>
      <div className="heading">
        Please Enter UserName
      </div>
        <input className="username" name="text" type="text"
          onChange={onInput}
          value={newLoginUser}
        />
        {user === "Doctor" ?
          <button className="create" type="button" onClick={loginCreateDoctor} >Login</button>
          :
          <button className="create" type="button" onClick={loginCreatePatient} >Login</button>
        }
        <div className="status">
          {error}
        </div>
    </div>

  )
}


export default Login;