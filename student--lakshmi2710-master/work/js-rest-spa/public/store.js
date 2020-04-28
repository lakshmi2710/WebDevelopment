
(function IIFE() {

    const items = {};

    const loginDom = document.getElementById("login-page")
    const inventoryDom = document.getElementById("inventory-page")
    const addButton = document.querySelector('.outgoing');
    const list = document.querySelector('.items');
    const newItemEl = document.querySelector('.to-add');
    const login = document.querySelector('.create')
    const newUser = document.querySelector('.username');
    const logout = document.querySelector('.logout');


    document.getElementById("inventory-page").style.visibility = "hidden";
    fetch('/api/session', {
        method: 'GET',
      })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( response => {
            if(response.ok){
                
                document.getElementById("login-page").remove();
                document.body.append(inventoryDom);
                document.getElementById("inventory-page").style.visibility = "visible";
            }
        })
        .catch( err => {});
    
    function renderListHTML(itemsList){
        list.innerHTML = Object.keys(itemsList).map((key) => {
            const item = itemsList[key];
            return `
        <li>
        <span data-id="${key}">
            <div class="item">
                <div class="description">
                    <span>${item.itemName}</span>
                </div>
                <div>
                <input data-id="${key}" class="update-text" type="integer" name="name" value="${item.quantity}">
                <button data-id="${key}" class="update" type="button" name="button">update</button>
                <button data-id="${key}" class="delete-btn" type="button" name="button">x</button>
                </div>
                
            </div>
        </span>
        </li>    
        `;
        }).join('\n');
    }
        
    const renderList = () => {
        list.innerHTML = "<h3>Loading.. please wait...</h3>";
        fetch('/api/items/', {
            method: 'GET',
          })
            .then( response => {
                return response.json();
            })
            .then( items => {
                renderListHTML(items);      
            })
            .catch( err => {});
    };
    
    function deleteItem(itemID){
        fetch(`/api/item/${itemID}`, {
            method: 'DELETE',
          })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( response => {
                if(response.ok){
                    renderList();
                }
            })
            .catch( err => {});
    }

    function updateItem(itemID, updateValue){
        fetch(`/api/item/${itemID}`, {
            method: 'PUT',
            body: JSON.stringify({"update": updateValue}),
            headers: new Headers({
                'content-type' : 'application/json'
            })
          })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( response => {
                if(response.ok){
                    renderList();
                }
            })
            .catch( err => {});
    }

    list.addEventListener('click', function(event) {
        const id = event.target.dataset.id;
    
        if (event.target.classList.contains("update")) {
            newValue = event.target.parentElement.getElementsByClassName("update-text")[0].value
            updateItem(id, newValue);
        }
     
        if (event.target.classList.contains('delete-btn')) {
            deleteItem(id);
        }
    });
    
    newItemEl.addEventListener('keyup', function(event) {
        const text = event.target.value;
        addButton.disabled = !text;
    });

    addButton.addEventListener('click', function(event) {
        const itemName = newItemEl.value.toUpperCase();
        const itemConflict = document.querySelector('.duplicateError');

        fetch(`/api/items`, {
            method: 'POST',
            body: JSON.stringify({'itemName': itemName, 'quantity': 0}),
            headers: new Headers({
                'content-type' : 'application/json'
            })
          })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( response => {
                
                if(response.status==409){
                    response.json().then(data => {
                        itemConflict.innerHTML = data.errorMsg
                    })
                }
                if(response.ok){
                    itemConflict.innerHTML = ""
                }
           
            })
            .catch( err => {});

        newItemEl.value = '';
        addButton.disabled = true;
        
        renderList();
        
    });

    login.addEventListener('click', function(event) {
        const user = newUser.value.toUpperCase();
        const loginStatus = document.querySelector('.loginStatus')
        newUser.value = '';
        
        fetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({'username': user}),
            headers: new Headers({
                'content-type' : 'application/json'
            })
          })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( response => {
                if(response.status==400){
                    response.json().then(data => {
                        loginStatus.innerHTML = data.errorMsg
                    })
                }
                if(response.ok){
                    loginStatus.innerHTML = ""
                    document.getElementById("login-page").remove();
                    document.body.append(inventoryDom);
                    document.getElementById("inventory-page").style.visibility = "visible";
                }
            })
            .catch( err => {});
        
    });

    logout.addEventListener('click', function(event) {
        const itemConflict = document.querySelector('.duplicateError')
        fetch('/api/session', {
            method: 'DELETE',
          })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( response => {
                if(response.ok){
                    newItemEl.value = '';
                    itemConflict.innerHTML = ""
                    document.getElementById("inventory-page").remove();
                    document.body.append(loginDom);  
                }
            })
            .catch( err => {});
    });


    addButton.disabled = true;
    renderList(items);
    })()