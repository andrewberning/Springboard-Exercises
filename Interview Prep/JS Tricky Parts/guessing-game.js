/*
**Guessing Game**

Write a function called ***guessingGame*** which returns a function that allows you to guess a random whole number between 0 and 99. Every time you create a new game, it should select a *new* random number, and keep it secret from the player.

Once the game has started, you can guess the number. The game should tell you whether your guess is too high, too low, or correct.

After a correct guess, the game ends.

let game = guessingGame();
game(50); // "50 is too low!"
game(90); // "90 is too high!"
game(70); // "You win! You found 70 in 3 guesses."
game(70); // "The game is over, you already won!"
*/

function guessingGame() {
  // store a random num between 0 and 100 in a variable
  const ANSWER = Math.floor(Math.random() * 100);

  // establish state of game in a variable: isOver = false
  let isOver = false;
  
  // store numGuesses in a variable, starting at 0;
  let numGuesses = 0;

  // return function called **guess** that takes in a num
  return function guess(num) {
        // if isOver is true, return string stating the game is over and that you already won
        if (isOver) return `The game is over, you already won.`;
        // increment numGuesses
        numGuesses++;
        // if num === ANSWER
        if (num === ANSWER) {
          // change the state of isOver to 'true'
          isOver = true;
          // use ternary operator, if numGuesses is equal to 1, "guess", else "guesses". store in a variable guess
          const guess = numGuesses === 1 ? "guess" : "guesses";
          // return a template literal of "You win! You found  ${num} in ${numGuesses} ${guess}.";
          return `You win! You found ${num} in ${numGuesses} ${guess}.`;
        }
          
        // if num < random num, return "num is too low"
        if (num < ANSWER) return `${num} is too low.`
        // if num > random num, return "num is too high"
        if (num > ANSWER) return `${num} is too high.`
  }
}

module.exports = { guessingGame };
