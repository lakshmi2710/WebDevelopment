import React from 'react'

function ChatMsssages({ messagelist }) {
    if (Object.keys(messagelist).length === 0) {
        return (
            <div className="messages">
                <h3>Messages</h3>
            </div>
        );
    }
    const chatList = messagelist.chats.map((message) =>
        <p>{message.timestamp} {message.username}: {message.message}</p>)

    return (
        <div className="messages">
            <h3>Messages</h3>
            <ul className="message-list">  
                {chatList}
            </ul>
        </div>
    )
}

export default ChatMsssages;