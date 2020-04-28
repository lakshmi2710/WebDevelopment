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
  
  export const fetchTaskList = (username) => {
    return fetch(`/tasks/${username}`, {
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
  
  export const fetchPostTask = (username, newTask) => {
    return fetch(`/tasks/${username}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
            "task": {"taskName": newTask, "taskStatus": "NotDone"}
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

    export const fetchPutTask = (username, taskid, taskName, taskStatus) => {
        return fetch(`/tasks/${username}/${taskid}`, {
            method: 'PUT',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({
                "task": {"taskName": taskName, "taskStatus": taskStatus}
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

    export const fetchDeleteTask = (username, taskid) => {
        return fetch(`/tasks/${username}/${taskid}`, {
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

  export const fetchGetTheme = (username) => {
    return fetch(`/theme/${username}`, {
        method: 'GET'
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

export const fetchPutTheme = (username,theme) => {
    return fetch(`/theme/${username}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
           theme
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