const gamePlay = require('./game');
const player = require('./player');

function wordListHtml(){
    return gamePlay.wordList.map(word => {
        return `<ul>${word}</ul>`
      }).join("\n");
}

function wordList(){
    return `
        <div class="list">
            <h3><strong>Word List - Dictionary</strong></h3>
        <div class="nav">`
        +
        wordListHtml()
        +
        `</div>
        </div>`;
        
}

function guessedWord(uid){
    return `<div class="list">
    <h3><strong> Correctly Guessed Words</strong></h3>
    <div class="nav">`
    +
    player.playerData[uid].correctlyGuessedWords.map(word =>{
        return `<ul>${word}</ul>`
    }).join("\n")
    +
    `</div>
    </div>
    `};

function triedWords(uid){
    return `<div class="list">
    <h3><strong>Words entered so Far:</strong></h3>
    <div class="nav">`
    + 
    player.playerData[uid].attemptedGuessWords.map(attemptedWord => {
        return `<ul>${attemptedWord}</ul>`
    }).join("\n")
    +    
    `</div>
    </div>
    `};

function formData(){
    return `
    <div>
    <form class="form-data" align="center" action="/playGame" method="POST">
    <h3><strong> Guess the word</strong>:&nbsp;</h3>
    <p><input class = "text-fields" name="guessWord" type="text" size="55" /></p>
    <p><br /> <input class="send-button" type="submit" value= " Enter " /></p>
    </form>
    </div>`
};

function gamePage(uid){
    const wordList1 = wordList();
    const guessedWordList = guessedWord(uid);
    const triedWordList = triedWords(uid);
    const formData1 = formData();
    let incorrectPrevGuess = "";


    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="game.css" />
        <title>Play Game</title>
    </head>
    <body>
        <div id="game-app">
        <h2 align="center">Welcome To The Word Guessing Game!</h2>
        <div class="display-panel">
            ${wordList1}
            ${guessedWordList}    
         </div>
        <div class="display-panel">
                ${triedWordList}
                ${formData1}
        </div>
        ${incorrectPrevGuess}
    </body>
    </html>`;
};

module.exports = {gamePage};
