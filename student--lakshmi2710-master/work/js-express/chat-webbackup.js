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
    
    <body>
        <h2>Welcome To The Chatting App!</h2>
        <p>&nbsp;</p>
        <table style="height: 220px; width: 519px; border-color: black; background-color: skyblue; float: left;" border="Black">
            <tbody>
                <tr>
                    <td style="width: 118px;">Username</td>
                    <td style="width: 685px;">Message</td>
                </tr>
                <tr>
                    <td style="width: 118px;">
                        ${insertUsers}
                    </td>
                    <td style="width: 685px;">
                        ${insertMessages}
                    </td>
                </tr>
                <form action="/sendMessage" method="post">
                <tr>
                    <td style="width: 118px;">
                        <p>Name:&nbsp; <input name="sender" type="text" /></p>
                    </td>
                    <td style="width: 685px;">
                        <p>&nbsp;</p>
                        <p>Message:</p>
                        <p><input name="text" type="text" size="55" /></p>
                        <p><br /> <input type="submit" value="Send Message" /></p>
                    </td>
                </tr>
                </form>
            </tbody>
        </table>
    </body>
    
    </html>`;
}

module.exports = {chatPage};