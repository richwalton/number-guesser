/*  **********
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
************* */

// Game values --
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    

// UI elements --  

const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'); 

// Assign UI min max --   
minNum.textContent = min;
maxNum.textContent = max;


 // ******* --- My intial version based on requirements above --- ***********
// Listen for guess
// guessBtn.addEventListener('click', function(){
//   let guess = parseInt(guessInput.value);
//   replayMes.textContent = '';
//   guessesLeft = guessesLeft-1;
  
//   //RW * - Validation - Could also use 'guess !== guess' instead of 'isNaN(guess)' to test for nothing eneterd
//   if (isNaN(guess) || guess < min || guess > max){
//     setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
//   } else if(guess !== winningNum && guessesLeft === 0){
//     setMessage(`Sorry you lose, winning number is ${winningNum} press reset`, 'red');
//     startOver();
//     // guessesLeft = 3
//   } else if(guess !== winningNum && guess < winningNum){
//     setMessage(`Too low: you have ${guessesLeft} more tries`, 'black');
//   } else if(guess !== winningNum && guess > winningNum) {
//     setMessage(`Too high: you have ${guessesLeft} more tries`, 'black');
//   } else if(guess === winningNum){
//     setMessage(`YOU WIN!`, 'green');
//     startOver();
//     // guessesLeft = 3
//   } 
//   guessInput.value = '';
// });
// // create elements and styling for start over
// let gamePara = document.querySelector('#game p');
// let replayMes = document.createElement('p');

// // start rover function
// function startOver(){
//   guessInput.value = '';
//   guessesLeft = 3;
//   replayMes.textContent = `If you like to play again enter a new number`;
//   replayMes.style.color = 'green';
//   gamePara.appendChild(replayMes);
  
// }
// // Set message function
// function setMessage(msg, color) {
//   message.style.color = color;
//   message.textContent = msg;
// }


// ******* --- BT alt. version based on requirements above --- ***********
//Replay event listener
gameWrapper.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Event listener to listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validation
  if (isNaN(guess) || guess < min || guess > max){
   return setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  };

  // Check if won
  if(guess === winningNum){
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`)
    
  } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over -lost
      gameOver(false, `Game over, you lost. correct number was ${winningNum}`)
      
    } else {
      // game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} remaining guesses`, 'red')
      if(guessesLeft === 1) {
         setMessage(`${guess} is not correct, ${guessesLeft} guess left`, 'red');             }
    }
  }
}); 

// calculate winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
  }

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'

  // Disable Input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set message
  setMessage(msg, color);
  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// set message 
function setMessage(msg, color) {
  
  message.style.color = color;
  message.textContent = msg;
  message.setAttribute('style', `color: ${color}; background-color:rgb(255, 208, 172); border: 1px solid rgb(250, 180, 126);`)
}