const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

const storage = require('./storage');
const {
    v4: uuidv4
} = require('uuid');

app.use(cookieParser());
app.use(express.static('./build'));

app.post('/sessionPatient', express.json(), (req, res) => {
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
    storage.patients[uid] = username;

    res.cookie('uid', uid);
    res.json({ 'userName': username, 'userType': 'patient' });

});

app.post('/sessionDoctor', express.json(), (req, res) => {
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
    storage.doctors[uid] = username;
    res.cookie('uid', uid);
    res.json({ 'userName': username, 'userType': 'doctor' });

});

app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });

        return;
    }

    if ((!storage.patients[uid]) && (!storage.doctors[uid])) {
        res.status(401).json({
            error: 'Unauthorized User'
        });

        return;

    }
    if (!storage.patients[uid] && !storage.doctors[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    if (storage.patients[uid]) {
        res.status(200).json({ userName: storage.patients[uid], userType: "patient" });
    }
    else {
        res.status(200).json({ userName: storage.doctors[uid], userType: "doctor" });
    }
});


app.delete('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.doctors[uid] && !storage.patients[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    if (storage.doctors[uid]) {
        delete storage.doctors[uid];
        res.status(200).json({ message: 'Logout success!' });
        return
    }
    else {
        delete storage.patients[uid];
        res.status(200).json({ message: 'Logout success!' });
        return;
    }

});

app.get('/message', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.doctors[uid] && !storage.patients[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    const chatRoomID = storage.chatRoomMetaData[uid];
    res.json(storage.chatMessages.chatRoom[chatRoomID]);
});

app.post('/message', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    const msg = req.body.message;
    if (!uid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.doctors[uid] && !storage.patients[uid]) {
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
    if (storage.doctors[uid]) {
        username = "[Doctor] " + storage.doctors[uid];
    }
    else {
        username = "[Patient] " + storage.patients[uid];
    }
    message = req.body.message;
    const timestamp = new Date().toLocaleString();
    const chatRoomID = storage.chatRoomMetaData[uid];
    storage.chatMessages.chatRoom[chatRoomID].chats.unshift({
        'username': username,
        'message': message,
        'timestamp': timestamp
    });
    res.json({
        'message': 'Message send sucessfully'
    });
});

app.get('/availablePatients', (req, res) => {
    const doctor_uid = req.cookies.uid;
    if (!doctor_uid || !storage.doctors[doctor_uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.doctors[doctor_uid]) {
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    availPateintNames = [];
    Object.values(storage.availablePatients).map(item => availPateintNames.push({ 'name': storage.patients[item.id] }));

    if (availPateintNames.length == 0) {
        res.status(400).json({
            error: "Currently there are no patients requested for chat!"
        });
        return
    }

    res.json(availPateintNames);
});


app.post('/tips', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    const tip = req.body.healthTip;
    if (!uid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.doctors[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }

    if (tip === null || tip.match(/^ *$/)) {
        res.status(400).json({
            error: "Empty message: Please enter health tip"
        });
        return
    }
    
    doctorName = storage.doctors[uid];
    storage.healthTip.push({ 'doctorName': doctorName, 'healthTip': tip });
    res.json({
        'message': 'Health Tip sent sucessfully'
    });
});

app.get('/tips', (req, res) => {
    res.json(storage.healthTip);
});

app.post('/availablePatients', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if (!uid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.patients[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    if (storage.chatRoomMetaData[uid]) {
        res.json({ 'chatRoomId': storage.chatRoomMetaData[uid] })
        return;
    }
    for (let i = 0; i < storage.availablePatients.length; i++) {
        if (uid === storage.availablePatients[i].id) {
            res.json({});
            return;
        }
    }
    storage.availablePatients.push({ 'id': uid });
    res.json({})
});

app.get('/chatRoomId', (req, res) => {
    if (req.cookies.uid in storage.chatRoomMetaData) {
        res.json({ 'chatRoomId': storage.chatRoomMetaData[req.cookies.uid] });
        return;
    }
    res.status(200).send({});
})

app.post('/chatRoomId', (req, res) => {
    if (req.cookies.uid in storage.chatRoomMetaData) {
        res.json({ 'chatRoomId': storage.chatRoomMetaData[req.cookies.uid] });
        return;
    }
    if (req.cookies.uid in storage.doctors) {
        if (storage.availablePatients.length != 0) {
            const chatRoomId = uuidv4();
            storage.chatRoomMetaData[req.cookies.uid] = chatRoomId;

            let curPatient = storage.availablePatients.shift()
            storage.chatRoomMetaData[curPatient.id] = chatRoomId;

            // Generate chat room data
            storage.chatMessages.chatRoom[chatRoomId] = {
                "chats": [
                    {
                        'username': "[Moderator] Admin Bot",
                        'message': "Welcome to the chat room :)",
                        'timestamp': new Date().toLocaleString()
                    }
                ]
            };

            res.json({ 'chatRoomId': chatRoomId });
            return
        }
    }
    res.status(200).send({});
})

app.delete('/chatRoomId', (req, res) => {
    if (req.cookies.uid in storage.chatRoomMetaData) {
        const chatRoomId = storage.chatRoomMetaData[req.cookies.uid];
        if (storage.doctors[req.cookies.uid]) {
            message = 'Doctor left the chat room!';
        }
        else {
            message = 'Patient left the chat room!';
        }
        storage.chatMessages.chatRoom[chatRoomId].chats.unshift(
            {
                'username': "[Moderator] Admin Bot",
                'message': message,
                'timestamp': new Date().toLocaleString()
            }
        )
        delete storage.chatRoomMetaData[req.cookies.uid];
        res.status(200).send({});
        return;
    }
 
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));