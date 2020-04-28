(function iife() {

    const counter = () => {
        let count = 0;
        return () => {
            count += 1;
            return count;
        };
    };

    nextID = counter();
    const sessionData = {};
    const items = {};


    function generateNewUID(){
        new_uid = Math.floor(Math.random() * 9000000) + 1000000;
        if(new_uid in sessionData){
            return generateNewUID();
        }
        return new_uid;
    }

    function loginAPI(req, res){
        const username = req.body.username;
  
        if((typeof req.cookies !== 'undefined') && (typeof req.cookies.uid !== 'undefined') && (req.cookies.uid in sessionData)){
            res.send({message : "Login Successful!"});
            return;
        }
        else{
            if((typeof username === 'undefined') || (username === "") || (username.includes('DOG')) || (username.includes(' '))){
                res.status(400).json({errorMsg : "bad login"});
                return;
            }
            
            new_uid = generateNewUID();
            sessionData[new_uid] = username;
            res.cookie("uid", new_uid);
            res.send({message : "Login Successful!"});
        }
    }

    function logoutAPI(req, res){
        if((typeof req.cookies !== 'undefined') && (typeof req.cookies.uid !== 'undefined') && (req.cookies.uid in sessionData)){
            delete sessionData[req.cookies.uid];
            res.clearCookie('uid');
            res.send({message : "Logout Successful!"});
            return;
        }
        res.status(400).json({errorMsg : "Log out error"});
    }

    function getItemsList(res){
        res.send(items);
    }

    function addItem(req, res){
        for(let [itemID, itemData] of Object.entries(items)){
            if(req.body.itemName === itemData.itemName){
                res.status(409).send({errorMsg : "Item already added"});
                return;
            }
        };
        items[nextID()] = {"itemName" : req.body.itemName, "quantity" : 0};
        res.send({message : "Success!"});
        
    }

    function deleteItem(req, res){
        delete items[req.params.itemID];
        res.send({message : "Delete Successful!"});
    }

    function updateItem(req, res){
        
        items[req.params.itemID]['quantity'] = req.body.update;
        res.send({message : "Update Successful!"});
    }

    module.exports = {loginAPI, logoutAPI, getItemsList, addItem, deleteItem, updateItem};
})();