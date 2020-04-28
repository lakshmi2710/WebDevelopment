const words = require('./words.js');
const player = require('./player');

const wordList = words.wordList.split(/\s+/).filter( exists => !!exists );

const correctlyGuessedWords = [];
let incorrectPrevGuess = false;

let game = {
  word: pickWord(wordList),
  turns: 0,
  attemptedGuessWords: []
};

if(process.env.DEBUG) { console.log(`PSST!  The word is ${game.word}`); }

function wordGuessAttempt(guess, uid) {
  return takeTurn(game, guess.toUpperCase(), uid);
}

function getIncorrectPrevAttempt(){
  return incorrectPrevGuess;
}

function takeTurn(game, guess, uid) {
  if(!(guess.length == game.word.length) || !wordList.includes(guess)) {
    incorrectPrevGuess = true;
    return false;
  }
  incorrectPrevGuess = false;

  player.playerData[uid].turns++;

  if(player.playerData[uid].word == ""){
    player.playerData[uid].word = pickWord(wordList);
  }
  if(exactMatch(player.playerData[uid].word, guess)) {
    player.playerData[uid].correctlyGuessedWords.unshift(`${player.playerData[uid].word} in ${player.playerData[uid].turns} turns!`);
    return true;
  }
  const match = compare(game.word, guess);
  player.playerData[uid].attemptedGuessWords.unshift(`${guess} matched ${match} letters out of ${player.playerData[uid].word.length}`);
  return false;
}

function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase(); 
}

function pickWord(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function compare( word, guess ) {  
  guess = guess.toLowerCase();
  word = word.toLowerCase();
  let count = 0;
  for( let letter of word){
  
    if(guess.includes(letter)){
      guess = guess.replace(letter,'');
      count++;
    };
       };
  return count;
  }

function newGame(uid) {
    player.playerData[uid].word = pickWord(wordList);
    player.playerData[uid].turns =  0;
    player.playerData[uid].attemptedGuessWords = [];
  };



  module.exports = {wordList, wordGuessAttempt, correctlyGuessedWords, game, getIncorrectPrevAttempt, newGame};