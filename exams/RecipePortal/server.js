const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const storage = require('./storage');
app.use(cookieParser());
app.use(express.static('./public'));

const {
    v4: uuidv4
} = require('uuid');

const counter = () => {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};

nextID = counter();

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
    storage.cookieUser[uid] = username;
    const user = storage.cookieUser[uid];
    storage.cookieUser[uid] = {
        username
    };
    res.cookie('uid', uid);
    res.json(user);
});

app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !storage.cookieUser[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.cookieUser[uid]) {
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
    if (!uid || !storage.cookieUser[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.cookieUser[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    delete storage.cookieUser[uid];
    res.status(200).json({
        message: 'Logout success!'
    });
});

app.get('/recipe/:id', (req, res) => {
    const id = req.params.id;

    if (!storage.RecipeList[id]) {
        res.status(403).json({
            error: 'Recipe does not exist'
        });
        return;
    }
    author = storage.RecipeList[id].author;
    title = storage.RecipeList[id].title;
    ingredients = storage.RecipeList[id].ingredients;
    instruction = storage.RecipeList[id].instruction;
    res.json({
        'author': author,
        'title': title,
        'ingredients': ingredients,
        'instruction': instruction
    });
});

app.post('/recipe', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instruction = req.body.instruction;
    author = storage.cookieUser[uid].username;
    if (!uid || !storage.cookieUser[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.cookieUser[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    if (title.match(/^ *$/) || ingredients.match(/^ *$/) || instruction.match(/^ *$/)) {
        res.status(400).json({
            error: "Empty recipe: Please enter recipe details"
        });
        return
    }
    const id = nextID();
    storage.RecipeList[id] = {
        "title": title,
        'author': author,
        'ingredients': ingredients,
        'instruction': instruction
    };
    res.json({
        'id': id,
        'result': 'Recipe stored sucessfully'
    });
});



app.get('/recipe', (req, res) => {
    res.send(storage.RecipeList);
});


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));