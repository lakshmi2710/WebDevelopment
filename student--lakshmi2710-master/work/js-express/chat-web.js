const chat = require('./chat');

function chatHTMLData(){
    return chat.chatMessages.map(message => {
        return `
            <p>[${message.timestamp}] <strong>${message.sender}:&nbsp;</strong>${message.text}</p>
        `
    }).join("\n");
}

function UserList(){
    return chat.userList.map(user => {
        return `
            <p>${user} </p>
        `
    }).join("\n");
}

function chatPage(chat){
    const insertMessages = chatHTMLData();
    const insertUsers = UserList();

    return `<!DOCTYPE html>
            <html>
            <h2 align="center"> Welcome To The Chatting App!</h2>
            <head>
                <link rel="stylesheet" href="chat.css"/>
                <title>Chat</title>
            </head>
            <body >
                
                <div id="chat-app">
                    <div class="display-panel">
                        <div class="users">
                            <h3><strong>Usernames</strong></h3>
                            <p></p>
                            ${insertUsers}
                        </div>
                        <div class="message">
                            <h3><strong>Messages</strong></h3>
                            <p></p>
                                ${insertMessages}
                        </div>
                    </div>
                    <div class="outgoing">
                    <form class="form-data" action="/sendMessage" method="POST">
                        <p>Name:&nbsp;&nbsp;&nbsp;&nbsp; <input class = "text-fields" name="sender" type="text" /></p>
                        <p>Message:&nbsp;<input class = "text-fields" name="text" type="text" size="55" /></p>
                        <p><br /> <input class="button" type="submit" value= " Send " /></p>
                    </div>
                </div>
            </body>
        </html>`;
}

module.exports = {chatPage};
