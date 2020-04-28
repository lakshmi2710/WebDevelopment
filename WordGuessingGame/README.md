# Word Guessing Game

## About Application

The application is a game to guess a word.

The User will enter a word, and the page will do one of:
* Say the word is not one of the permitted words and allow them to enter a new word
* Display that the user has correctly guessed the word and allow them to start a new game
* Say how many letters the word has in common with the word they are trying to guess, without regard to position or case-sensitivity  (See "Examples" below)

### Visuals
* The game displays the list of previously guessed words for this word, as well as their number of "matching" letters
* The game displays the number of accepted guesses made (turns taken, not counting invalid words)
* The game displays the list of valid words to guess

### Logic 

* The game must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`
* The server work for multiple players, each playing their own games that may last different durations and are not impacted by other players.  
* No information is sent to the clients that allow them to learn the secret words they are trying to guess outside of guessing.

### Examples

If `words.js` has the words "TEA, EAT, TEE, PEA, PET, APE" and the game selects TEA as the secret word then:
* TREE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* ATE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* PET will respond with 2 matches and increment the turn counter then allow a new guess
* TEE will respond with 2 matches and increment the turn counter then allow a new guess
* tee will respond with 2 matches and increment the turn counter then allow a new guess
* EAT will respond with 3 matches and increment the turn counter then allow a new guess
* TEA will respond that they have won the game in however many turns and allow them to start a new game with a new randomly selected word from the list
