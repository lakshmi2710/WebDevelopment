"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
guess = guess.toLowerCase()
word = word.toLowerCase()

let count = 0;
for (let i =0; i < word.length;i++ ) {
	if(guess.includes(word[i])){
		guess = guess.replace(word[i],'');
		count++;
	}
     }
return count;
}
