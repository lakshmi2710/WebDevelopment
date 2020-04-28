const player = require('./player');

function gameWinPage(uid){

    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="game.css" />
        <title>Play Game</title>
    </head>
    <body>
        <div id="game-app">
        <h2 align="center">Congratulations!!!</h2>
        <h2 align="center">You won the game in ${player.playerData[uid].turns} turns</h2>
        <form class="form-data" align="center" action="/play" method="POST">
            <p><input class="send-button" align="center"  type="submit" name = "PlayAgain" value = "Play Again " /></p>
        </form>
    </body>
    </html>`;
};

function invalidGuess(){
    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="game.css" />
        <title>Play Game</title>
    </head>
    <body>
        <div id="game-app">
        <h2 align="center">Invalid Guess!</h2>
        <h3 align="center">Please choose a word from Dictionary :)</h3>
        <form class="form-data" align="center" action="/" method="GET">
            <p><input class="send-button" align="center"  type="submit" name = "Retry" value = "Retry" /></p>
        </form>
    </body>
    </html>`;
};

module.exports = {gameWinPage, invalidGuess};
