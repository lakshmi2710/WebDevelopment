import React, { useState, useEffect } from 'react';
import { fetchUserList, fetchGetChats } from '../services'
import ChatMessages from './ChatMessages'
import ActiveUser from './ActiveUser'
import MessageSend from './MessageSend'
import { fetchSendMessage } from '../services'

const GetuserList = ({ setUserList, setError }) => {
  fetchUserList()
    .then((usersList) => {
      setUserList(usersList);
    })
    .catch((err) => {
      setError(err.error);
    });
}

const GetchatList = ({ setMessageList, setError }) => {
  fetchGetChats()
    .then(messages => {
      setMessageList(messages);
    })
    .catch(err => {
      setError(err.error);
    });
};

const ChatApp = (username) => {

  const [userList, setUserList] = useState([]);
  const [messagelist, setMessageList] = useState([]);
  const [error, setError] = useState('');


  const getTextMessage = (newMEssage) => {
    fetchSendMessage(newMEssage)
      .then(() => {


      })
      .catch((err) => {
        setError(err.error);
      });
  }

  useEffect(() => {
    if (username) {
      GetuserList({ setUserList, setError });
      GetchatList({ setMessageList, setError });
    }
  }, [username]);


  return (
    <div id="chat-app">

      <div className="title">
        Welcome To The Chatting App!
            </div>
      <div className="chat-panel">
        {<ActiveUser userList={userList} />}
        {<ChatMessages messagelist={messagelist} />}
      </div>
      {<MessageSend getTextMessage={getTextMessage} GetchatList={GetchatList} setMessageList={setMessageList} error={error} setError={setError} />}
    </div>
  )
}

export default ChatApp;