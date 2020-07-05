/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values --
let min = 1,
    max = 10,
    winningNum = 2,
    guessesleft = 3;

// UI elements --  

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'); 
      
// Assign UI min max --   
minNum.textContent = min;
maxNum.textContent = max;   

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  console.log(guess);

  // Validate -- could also use 'guess !== guess' instead of 'isNaN(guess)' to test for nothing eneterd
  if (isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  } else if(guess !== winningNum && guess < winningNum){
    setMessage(`Too low`, 'black');
  } else if(guess !== winningNum && guess > winningNum) {
    setMessage(`Too high`, 'black');
  } else if(guess === winningNum){
    setMessage(`YOU WIN!`, 'green');
  }
  guessInput.value = '';
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
