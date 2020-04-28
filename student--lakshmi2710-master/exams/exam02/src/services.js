export const fetchLogIn = (username) => {
    return fetch('/session', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({
                username
            }),
        })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const fetchLoginStatus = () => {
    return fetch('/session', {
            method: 'GET',
        })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject({
                    code: 'login-invalid'
                });
            }
            return;
        });
};


export const fetchLogOut = () => {
    return fetch('/session', {
            method: 'DELETE'
        })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const fetchAddRecipe = (title, ingredients, instruction) => {
    return fetch(`/recipe`, {
            method: 'POST',
            body: JSON.stringify({
                'title': title,
                'ingredients': ingredients,
                'instruction': instruction
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        .catch(() => Promise.reject({
            error: 'network-error'
        }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });

};

export const fetchGetRecipe = () => {
    return fetch('/recipe', {
            method: 'GET',
        })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};



export const fetchGetDescription = (id) => {
    return fetch(`/recipe/${id}`, {
            method: 'GET',
        })
        .catch(() => {
            return Promise.reject({
                code: 'network-error'
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });

};