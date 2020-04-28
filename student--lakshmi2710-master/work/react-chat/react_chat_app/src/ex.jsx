import React,{useState, useEffect} from 'react';
import MessageArea from './MessageArea';
import SendMessage from './SendMessage';
import Refresh from './Refresh';
import Logout from './Logout'
import {fetchUserList, fetchMessageList, addMessage, logout } from '../services';

const REFRESH_TIME_IN_MS = 3000; // this is a "constant" - a config variable
const ADD_MESSAGE_FADE_TIME_IN_MS = 5000;


const getUserList = ({setIsLoading, username, setUserList, setErrorText}) => {
    fetchUserList({username})
      .then( users => {
        setUserList(users);
        setIsLoading(false);
      })
      .catch(err => {
        setErrorText("User List is Empty.");
      });
    };

  const getMessageList = ({setIsLoading, username, setMessageList, setErrorText}) => {
    fetchMessageList({username})
    .then( messages => {
      setMessageList(messages);
      setIsLoading(false);
    })
    .catch(err => {
      setErrorText("Message List is Empty.");
    });
  };
  


  const ChatApp = ({ username, setUsername }) => {
    const [userlist, setUserList] = useState([]);
    const [messagelist, setMessageList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorText, setErrorText] = useState('');

    useEffect( () => {
        // Don't call services if we don't have a sessionId
        if(username) {
            getUserList({setIsLoading, username,setUserList, setErrorText});
            getMessageList({setIsLoading, username, setMessageList, setErrorText});
            const intervalId = setInterval( () => {
                getUserList({setIsLoading, username,setUserList, setErrorText});
                getMessageList({setIsLoading, username, setMessageList, setErrorText});
            }, REFRESH_TIME_IN_MS );
          // Return the function to run if the component is removed from the page
          // React will call this automatically
          return function cleanup() {
            clearInterval(intervalId);
          };
        }
        // Though we don't expect sessionId to change,
        // this function will need to change if it does
        // This makes us not break if that assumption is changed
      }, [username]);

      const onLogout = ({username})=>{
        setIsLoading(true);
        logout({username})
        .then(() => {
            setUsername('');
            setIsLoading(false);
        })
        .catch(err => {
          setErrorText("You can not Logout.");
        }); 
      };

      const onRefresh = ({username}) => {
        setIsLoading(true);
        getUserList({setIsLoading, username,setUserList, setErrorText});
        getMessageList({setIsLoading, username, setMessageList, setErrorText});
      };

      const onSend = ({ username, timestamp, text })  => {
        setIsLoading(true);
        addMessage({ username, timestamp, text })
        .then(messages =>{
          setMessageList(messages);
          setTimeout( () => { setErrorText(''); }, ADD_MESSAGE_FADE_TIME_IN_MS);
          setIsLoading(false);
        })
        .catch(err => {
          setErrorText("You can not send empty message.");
        });  
      };
    

      return (
        <div>
            <div id="chat-app">          
                <Logout username={username} onLogout={onLogout} disabled={isLoading} />
                <Refresh username={username} onRefresh={onRefresh} disabled={isLoading} />
                <MessageArea username={username} userlist={userlist} messagelist={messagelist} />
                <SendMessage username={username} onSend={onSend} disabled={isLoading}/>
            </div>           
            <div> {errorText} </div>
        </div>
      );
  }

  export default ChatApp;