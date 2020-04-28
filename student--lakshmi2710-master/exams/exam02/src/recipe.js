import {
    fetchLogIn,
    fetchLoginStatus,
    fetchLogOut,
    fetchAddRecipe,
    fetchGetDescription,
    fetchGetRecipe
}
from './services';

const appState = {
    isLoggedIn: false,
    error: '',
};

const homeDom = document.querySelector('#home-page');
const loginDom = document.querySelector('#login-page');
const newRecipeDom = document.querySelector('#new-recipe');
const recipeDescriptionDom = document.querySelector('#description-page');

const login = document.querySelector('.login');
const logout = document.querySelector('.logout');
const home = document.querySelector('.home');

function renderErrors(text) {
    document.querySelector('.status').innerHTML = text;
}

function renderAddRecipePage() {
    homeDom.remove();
    document.body.append(newRecipeDom);
    document.querySelector('.home').style.visibility = "visible";
    appState.error = '';
    renderErrors(appState.error);
}

logout.addEventListener('click', (e) => {
    fetchLogOut()
        .then(() => {
            appState.isLoggedIn = false;
            appState.error = '';
            renderHomePage();
        })
        .catch((err) => {
            appState.isLoggedIn = false;
            appState.error = err.error;
            renderHomePage();
        });
});

function renderLoginPage() {
    recipeDescriptionDom.remove();
    homeDom.remove();
    document.body.append(loginDom);
    document.querySelector('.home').style.visibility = "visible";
    appState.error = '';
    renderErrors(appState.error);
};

function renderHomePage() {
    recipeDescriptionDom.remove();
    newRecipeDom.remove();
    loginDom.remove();
    document.body.append(homeDom);
    getRecipe();
    document.querySelector('.home').style.visibility = "hidden";
    if (appState.isLoggedIn) {
        document.querySelector('.add-btn').style.visibility = "visible";
        document.querySelector('.logout').style.visibility = "visible";
        document.querySelector('.login').style.visibility = "hidden";
    } else {
        document.querySelector('.logout').style.visibility = "hidden";
        document.querySelector('.add-btn').style.visibility = "hidden";
        document.querySelector('.login').style.visibility = "visible";
    }
};

function renderRecipePage(title, author, ingredients, instruction) {
    homeDom.remove();
    newRecipeDom.remove();
    document.body.append(recipeDescriptionDom);
    document.querySelector('.home').style.visibility = "visible";
    const toAddRecipe = document.querySelector('.description');
    toAddRecipe.innerHTML =
        `Title: <span class='color-set'>${title}<br/></span>
            Author: <span class='color-set'>${author}<br/></span>
            Ingredients: <span class='color-set'>${ingredients}<br/></span>
            Instruction: <span class='color-set'>${instruction}</span>`
};

login.addEventListener('click', (e) => {
    renderLoginPage()
});

home.addEventListener('click', (e) => {
    renderHomePage()
});

const userCreate = document.querySelector('.login-panel');

userCreate.addEventListener('click', (e) => {
    if (!e.target.classList.contains('create')) {
        return;
    }

    const username = userCreate.querySelector('.username').value.toUpperCase();
    userCreate.querySelector('.username').value = '';
    fetchLogIn(username)
        .then(() => {
            appState.isLoggedIn = true;
            appState.error = '';
            renderHomePage();

        })
        .catch((err) => {
            appState.error = err.error;
            renderErrors(appState.error);
        });
});

const addRecipe = document.querySelector('.add-btn');

addRecipe.addEventListener('click', (e) => {
    renderAddRecipePage();
});

const sendNewRecipe = document.querySelector('.add-recipe-btn');

sendNewRecipe.addEventListener('click', (e) => {
    const title = document.querySelector('[name="Title"]').value;
    const ingredients = document.querySelector('[name="Ingredients"]').value;
    const instruction = document.querySelector('[name="Instructions"]').value;
    document.querySelector('[name="Title"]').value = '';
    document.querySelector('[name="Ingredients"]').value = '';
    document.querySelector('[name="Instructions"]').value = '';

    fetchAddRecipe(title, ingredients, instruction)
        .then((res) => {
            appState.error = '';
            getRecipeDesctiption(res.id)
        })
        .catch((err) => {
            appState.error = err.error;
            renderErrors(appState.error);
        });
});

const recipeLink = document.querySelector('.recipe-list');

function getRecipeDesctiption(id) {
    fetchGetDescription(id)

    .catch((err) => {
            appState.error = err.error;
            renderHomePage();
        })
        .then((res) => {
            appState.error = '';
            renderRecipePage(res.title, res.author, res.ingredients, res.instruction);
        });
}

recipeLink.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    getRecipeDesctiption(id);

});

function getRecipe() {
    fetchGetRecipe()
        .catch((err) => {
            appState.error = err.error;
            renderHomePage();
        })
        .then((res) => {
            appState.error = '';
            renderRecipeList(res);
        });
};

const list = document.querySelector('.recipe-list');

function renderRecipeList(RecipeList) {
    list.innerHTML = Object.keys(RecipeList).map((id) => {
    const recipe = RecipeList[id];
        return `
        <ul>
            <button data-id="${id}" class="recipe-button" type="button" name="recipe">${recipe.title}: By ${recipe.author}</button>
        </ul><br/>    
    `;
     }).join('\n');
};

// Initial load

fetchLoginStatus()
    .then(() => {
        appState.isLoggedIn = true;
        renderHomePage();
    })
    .catch(() => {
        appState.isLoggedIn = false;
        renderHomePage();
    });