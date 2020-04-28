import React, { useState } from 'react';
import welcomeImg from '../img/img5.jpg'
import Login from './Login'

const WelcomePage = ({ onLogin }) => {
    const [User, setUser] = useState('');
    const [isStarted, setStarted] = useState(false);

    const CallDoctorLogin = () => {
        setStarted(true)
        setUser('Doctor')
    }

    const CallPatientLogin = () => {
        setStarted(true)
        setUser('Patient')
    }

    const calSetSatart = () => {
        setStarted(false);
    }

    return (
        <div>
            {isStarted ?
                <div>
                    <button className="btn-home" type="button" onClick={calSetSatart}>Home</button>
                    <Login user={User} onLogin={onLogin} />
                </div>
                :
                <div className='bg'>
                    <img src={welcomeImg} alt="bg" class="bg" />
                    <div className="title">
                        Welcome to Health Care Center
                    </div>
                    <div className="sub_title">
                        Get Started
                    </div>
                    <div className='btn-starters'>
                        <button className="btn-start-doctor" type="button" onClick={CallDoctorLogin}>Doctor</button>
                        <div className="divider" />
                        <button className="btn-start-patient" type="button" onClick={CallPatientLogin}>Patient</button>
                    </div>
                </div>
            }

        </div>

    );
};

export default WelcomePage;
