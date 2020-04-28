import React, { useState } from 'react'

function MessageSend({ getTextMessage, GetchatList, setMessageList, error, setError }) {

    const [newMessage, setNewMEssage] = useState('');

    const onInput = (event) => {
        setNewMEssage(event.target.value);
    }

    const sendMessage = () => {
        getTextMessage(newMessage);
        setNewMEssage('')
        setError('');
        GetchatList({ setMessageList });
    }


    return (

        <div className="outgoing">
            <input className="message" name="text" type="text" onChange={onInput} value={newMessage} />

            <button className="btn-msg" type="button" onClick={sendMessage}>Send
            </button>

            <div className="status">
                {error}
            </div>

        </div>

    )

}

export default MessageSend;