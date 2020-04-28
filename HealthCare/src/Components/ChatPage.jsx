import React, { useState, useEffect } from 'react';
import { fetchGetChats } from '../services'
import ChatMessages from './ChatMessages'
import MessageSend from './MessageSend'
import { fetchSendMessage } from '../services'
import welcomeImg from '../img/img11.jpg'

const ChatPage = ({ callBackFromChats }) => {
  const [messagelist, setMessageList] = useState([]);
  const [error, setError] = useState('');
  const REFRESH_TIME_IN_MS = 3000;

  const GetchatList = ({ setMessageList, setError }) => {
    fetchGetChats()
      .then(messages => {
        setMessageList(messages);
      })
      .catch(err => {
        setError(err.error);
      });
  };

  const getTextMessage = (newMEssage) => {
    fetchSendMessage(newMEssage)
      .then(() => {
      })
      .catch((err) => {
        setError(err.error);
      });
  }

  const callBack = () => {
    callBackFromChats();
  }

  useEffect(() => {
   
    GetchatList({ setMessageList, setError });
    const intervalId = setInterval(() => {
      GetchatList({ setMessageList, setError });
    }, REFRESH_TIME_IN_MS);
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <div id="chat-app">
      <div className="title">
        Welcome To The Chat Room!
      </div>
      <div className='bg'>
        <img src={welcomeImg} alt="bg" class="bg" />
        <button className="btn-main" type="button" onClick={callBack}>Quit Chat</button>

        {<MessageSend getTextMessage={getTextMessage} GetchatList={GetchatList} setMessageList={setMessageList} error={error} setError={setError} />}
        
        <div className="chat-panel">
          {<ChatMessages messagelist={messagelist} />}
        </div>
        
      </div>
    </div>
  )
}

export default ChatPage;