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
            return response.json();
        });
};

export const fetchUserList = () => {
    return fetch('/users', {
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

export const fetchGetChats = () => {
    return fetch('/message', {
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

export const fetchSendMessage = (msg) => {
    return fetch(`/message`, {
        method: 'POST',
        body: JSON.stringify({
            'message': msg
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