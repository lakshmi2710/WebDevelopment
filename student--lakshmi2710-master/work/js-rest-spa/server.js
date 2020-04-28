const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const inventoryAPI = require('./inventoryApi');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/api/session/', express.json(), (req, res) => {
    inventoryAPI.loginAPI(req, res);
});

app.post('/api/session/', express.json(), (req, res) => {
    inventoryAPI.loginAPI(req, res);
});

app.delete('/api/session', (req, res) => {
    inventoryAPI.logoutAPI(req, res);
});

app.get('/api/items/', (req, res) => {
    inventoryAPI.getItemsList(res);
});

// Adding new item
app.post('/api/items', express.json(), (req, res) => {
    inventoryAPI.addItem(req, res);
});

app.delete('/api/item/:itemID', express.json(), (req, res) => {
    inventoryAPI.deleteItem(req, res);
});

app.put('/api/item/:itemID', express.json(), (req, res) => {
    inventoryAPI.updateItem(req, res);
});

app.listen(3000, () => console.log('http://localhost:3000/') );