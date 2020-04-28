const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');


const game = require('./game');
const player = require('./player');
const gameWeb = require('./game-web');
const gameWin = require('./game-win');

app.use(cookieParser());

app.use(express.static('./public'));


app.get('/', (req, res) => {
  player.checkCookieUID(req.cookies, res);
  res.send(gameWeb.gamePage(req.cookies.uid));
});

app.post('/playGame', express.urlencoded({ extended: false }), (req, res) => {
  player.checkCookieUID(req.cookies, res);
  let { guessWord } = req.body;
  guessWord = guessWord.toUpperCase();
  if(guessWord && (guessWord.length == game.wordList[0].length) && game.wordList.includes(guessWord)){
    gameResult = game.wordGuessAttempt(guessWord, req.cookies.uid);
    if(gameResult){
      res.redirect("/won");
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.send(gameWin.invalidGuess());
  }
});

app.get('/won', (req, res) =>{
  player.checkCookieUID(req.cookies, res);
  res.send(gameWin.gameWinPage(req.cookies.uid));
});

app.post('/play', express.urlencoded({ extended: false }), (req, res) => {
  player.checkCookieUID(req.cookies, res);
  const { PlayAgain } = req.body;
  if(PlayAgain)
  {
    game.newGame(req.cookies.uid);
    res.redirect("/");
  };
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
