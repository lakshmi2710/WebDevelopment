import React, { useState, useEffect } from 'react';
import { fetchGetTips, fetchPostAvailablePatient, fetchGetChatRoomId, fetchDeleteChatRoom } from '../services'
import welcomeImg from '../img/img9.jpg'
import HealthTipPage from './HealthTipPage'
import ChatPage from './ChatPage'

const PatientPortal = () => {

    const [error, setError] = useState('');
    const [healthTip, setViewHealthTip] = useState(false);
    const [tipsList, setHealthTips] = useState('');
    const [chatPageRender, setChatPageRender] = useState(false);
    const [ClientMsg, setClientMsg] = useState("")
    const REFRESH_TIME_IN_MS = 3000;


    useEffect(() => {
        getChatRoomId();
        const intervalId = setInterval(() => {
            getChatRoomId();
            if (chatPageRender == true) {
                goToChatPage()

            }

        }, REFRESH_TIME_IN_MS);
        return function cleanup() {
            clearInterval(intervalId);
        };
    }, []);

    const goToHealthTipPage = () => {
        getHealthTips();
        setViewHealthTip(true)
    }

    const getHealthTips = () => {

        fetchGetTips()
            .then((healthTips) => {
                setHealthTips(healthTips);
            })
            .catch((err) => {
                setError(err.error);
            });
    }

    const getChatRoomId = () => {

        fetchGetChatRoomId()
            .then((data) => {
                if (Object.keys(data).length == 0) {
                    setChatPageRender(false);
                    return;
                }
                setChatPageRender(true);
            })
            .catch((err) => {
                setError(err.error);
            });
    }

    const goToChatPage = () => {
        setClientMsg("Waiting for Doctor, thanks for your patience")
        fetchPostAvailablePatient()
            .then((data) => {
                if (data.chatRoomId) {
                    setChatPageRender(true);
                }
            })
            .catch((err) => {
                setError(err.error);
            });
    }

    const callBackFromTips = () => {
        
        setViewHealthTip(false);
        setChatPageRender(false);
    }

    const callBackFromChats = () => {
        setClientMsg("");
        fetchDeleteChatRoom()
            .then(() => {
            })
            .catch((err) => {
                setError(err.error);
            });
        setViewHealthTip(false);
        setChatPageRender(false);
    }


    return (
        <div>
            {healthTip ?
                <HealthTipPage tipsList={tipsList} callBackFromTips={callBackFromTips} /> :
                (chatPageRender ? <ChatPage callBackFromChats={callBackFromChats} /> :
                <div>
                    <div className="title">
                        Welcome To Health Care Center, Feel free to connect with Doctors
                    </div>
                        <div className='bg'>
                            <img src={welcomeImg} alt="bg" class="bg" />
                            <div className="divider"/>
                            <div>
                                <button className="btn-view-tip" type="button" onClick={goToChatPage} >Request chat appointment with Doctor</button>
                            </div>
                            <div className="status">
                                {ClientMsg}
                            </div>
                            <div className="divider"/>
                            <div >
                                <button className="btn-view-tip" type="button" onClick={goToHealthTipPage}>View Health Tips</button>
                            </div>
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

export default PatientPortal;