const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const storage = require('./storage');
const {
    v4: uuidv4
} = require('uuid');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/users', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !storage.users[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[uid]) {
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    const activeUsers = [];
    for (let [key, value] of Object.entries(storage.users)) {
        activeUsers.push(value.username);
    }
    res.json(activeUsers);
});


app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    if ((typeof username === 'undefined') || (username === "") || (username.includes(' '))) {
        res.status(404).json({
            error: 'Not Found: missing-name'
        });
        return;
    }
    if ((username === 'DOG')) {
        res.status(403).json({
            error: "Forbidden: Invalid UserName"
        });
        return;
    }

    const uid = uuidv4();
    storage.users[uid] = username;
    const user = storage.users[uid];
    storage.users[uid] = {
        username
    };
    res.cookie('uid', uid);
    res.json(user);

});

app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !storage.users[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    res.sendStatus(200);
});


app.delete('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !storage.users[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    delete storage.users[uid];
    res.status(200).json({
        message: 'Logout success!'
    });
});

app.get('/message', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !storage.users[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    res.json(storage.chatMessages);
});

app.post('/message', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    const msg = req.body.message;
    if (!uid || !storage.users[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    if (msg === null || msg.match(/^ *$/)) {
        res.status(400).json({
            error: "Empty message: Please enter message"
        });
        return
    }
    username = storage.users[uid].username;
    message = req.body.message;
    const timestamp = new Date().toLocaleString();

    storage.chatMessages.chats.push({
        'username': username,
        'message': message,
        'timestamp': timestamp
    });

    res.json({
        'message': 'Message send sucessfully'
    });
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));