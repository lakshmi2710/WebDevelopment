import React, { useState, useEffect } from 'react';
import { fetchGetTips, fetchSendTip, fetchGetAvailablePatients, fetchDeleteChatRoom, fetchSetChatRoomId } from '../services'
import welcomeImg from '../img/img7.jpg'
import HealthTipPage from './HealthTipPage'
import ChatPage from './ChatPage'


const DoctorPortal = () => {

    const [newTip, setNewTip] = useState('');
    const [error, setError] = useState('');
    const [healthTip, setViewHealthTip] = useState(false)
    const [tipsList, setHealthTips] = useState('');
    const [PatientList, setPatientList] = useState('')
    const [chatPageRender, setChatPageRender] = useState(false);
    const [chatRoomId, setChatRoomId] = useState(0);
    const [clientError, setclientError] = useState("");
    const REFRESH_TIME_IN_MS = 3000;


    const onInput = (event) => {
        const textValue = event.target.value
        setNewTip(textValue);
    }

    const sendHealthTip = () => {
        fetchSendTip(newTip)
            .then(() => {
                setNewTip("");
            })
            .catch((err) => {
                setError(err.error);
            });
    }

    const goToHealthTipPage = () => {
        getHealthTips();
        setViewHealthTip(true)
    }

    const getHealthTips = () => {
        fetchGetTips()
            .then((healthTips) => {
                setHealthTips(healthTips);
                setError("")
            })
            .catch((err) => {
                setError(err.error);
            });
    }

    const patientslist = () => {
        fetchGetAvailablePatients()
            .then((patientList) => {
                setclientError("");
                setPatientList(patientList);
                
            })
            .catch((err) => {
                setclientError(err.error);
                setPatientList('');
            });
    }

    const callBackFromTips = () => {
        setError("")
        setViewHealthTip(false)
        setChatPageRender(false);
    }

    const callBackFromChats = () => {
        setError("")
        fetchDeleteChatRoom()
            .then(() => {
            })
            .catch((err) => {
                setError(err.error);
            });
        setViewHealthTip(false);
        setChatPageRender(false);
    }

    const goToChatPage = () => {
        fetchSetChatRoomId()
            .then((data) => {
                if (Object.keys(data).length == 0) {
                    setChatPageRender(false);
                    return;
                }
                setChatRoomId(data.chatRoomId);
                setChatPageRender(true);
            })
            .catch((err) => {
                setError(err.error);
            });
    }

    useEffect(() => {
        patientslist();
        const intervalId = setInterval(() => {
            patientslist();
        }, REFRESH_TIME_IN_MS);
        return function cleanup() {
            clearInterval(intervalId);
        };
    }, []);

    const patients = Object.values(PatientList).map((patient) =>
        <div>
            <button className="btn-patient" type="button" name="button" >{patient.name}</button>
        </div>
    )

    return (
        <div>
            {healthTip ?
                <HealthTipPage tipsList={tipsList} callBackFromTips={callBackFromTips} /> :
                (chatPageRender ? <ChatPage callBackFromChats={callBackFromChats} /> :
                <div>
                    <div className="title">
                        Welcome Doctor
                    </div>
                    <div className='bg'>
                            <img src={welcomeImg} alt="bg" class="bg" />
                            <div className="patients">
                            <div className="heading">
                               Waiting Patients
                            </div>
                                <ul className="patient-list">
                                    {patients}
                                </ul>
                                <div className="status">
                                    {clientError}
                                </div>
                            </div>
                        </div>

                        <div>
                            <button className="btn-view-tip" type="button" onClick={goToChatPage}>Go To Chat Room</button>
                        </div>

                        <div className='title-tip'>
                            Add Health Tip
                        </div>
                            <div className="">
                                <textarea className="tip-text" name="text" type="text" onChange={onInput} value={newTip} />
                                <div>
                                    <button className="btn-tip" type="button" onClick={sendHealthTip}>Add Tip</button>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div>
                                <button className="btn-view-tip" type="button" onClick={goToHealthTipPage}>View Health Tips</button>
                            </div>
                            <div className="status">
                                {error}
                            </div>
                        
                </div>
                   
                )
            }
        </div>
    )
}

export default DoctorPortal;