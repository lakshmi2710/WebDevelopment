let playerData = {
 
};

// gets cookie has UID, then returns UID else creates new uid in server
// if no uid cookie, then new uid cookie is set on client
function checkCookieUID(cookies, res){
  if("uid" in cookies){
    if(!(cookies.uid in playerData)){
      playerData[cookies.uid] = {
        attemptedGuessWords: [],
        correctlyGuessedWords: [],
        word: "",
        turns: 0,
        uid: cookies.uid
      };
      return true;
    }
  }
  else{
    new_uid = Math.floor(Math.random() * 9000000) + 1000000;
    res.cookie("uid", new_uid);
    res.redirect("/");
  }
};

module.exports = {checkCookieUID, playerData};