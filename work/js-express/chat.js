const chatMessages = [];
const userList = [];

function addMessage({sender, text, timestamp = new Date().toLocaleString()}){
    sender = sender.toUpperCase()
    if ((sender) && (text)){
        if (!(userList.includes(sender))){
            userList.push(sender);
        }
        
        chatMessages.push({sender, text, timestamp});
    }
}

module.exports = {addMessage, chatMessages, userList};