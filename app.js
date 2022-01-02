/* 
GAME FUNCTION:
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify player the guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values / variable
let min = 1,
    max = 10,
    winningNum = Math.floor
        (Math.random()*max+min),
    guessesLeft = 3;
// it is also the same thing as let min = 1, max = 10....

// UI Elements
const game = document.querySelector('.main'),
      minNum = document.querySelector('.minNum'),
      maxNum = document.querySelector('.maxNum'),
      guessBtn = document.querySelector('#submit'),
      guessInput = document.querySelector('#guessedNum'),
      message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
// NOTE : Any new class that is added , we have to use event delegation to target that class
game.addEventListener('mousedown', function(e){  // Why I use mousedown instead of click is that , with the click , the click event will act on the subnmit btn and then also act on the playAgain since they are on the same btn
    if(e.target.classList.contains('playAgain')){
        window.location.reload()
    }
})

// Listen for a guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        calculateGuess()
    }

    // CalculaTe guess function
    function calculateGuess(){
        if(guess === winningNum){
            // Disable Input
            guessInput.disabled = true;

            gameOver(true, `${winningNum} is correct, YOU WIN!`);

            
            // set message
            // setMessage(`${winningNum} is correct, YOU WIN!`, 'green', 'green');
    
        } else {
            // Wrong number
            guessesLeft -= 1;
    
            if(guessesLeft === 0){
                // Game over  - lost
                gameOver(false, `Game Over , YOU LOST, The correct answer was ${winningNum}`)
                // Disable Input
            guessInput.disabled = true;
            
            } else {
                // set message
                setMessage(`${guess} is not correct you have ${guessesLeft} guesses left`, 'red');
    
                // Clear input
                guessInput.value = ''
            }
        }

        // Game over function
        function gameOver(won, msg){
            let color;
            won === true ? color = 'green' : color = 'red';
            // guessInput.style.borderColor = color;
            message.style.color = color;
            guessInput.style.border = `3px solid ${color}`;
            // guessInput.style.borderColor = color;
            setMessage(msg)

            // Play again
            guessBtn.value = 'PLAY AGAIN';
            guessBtn.className += 'playAgain' // why i added a new class is because i want to add a new event listner for this submit SO i will have to append it, Because if i did not append it, the old event listner of that class will stop working.
        }
    }
})

// setMessage function
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
    guessInput.style.border = `3px solid ${color}`
    // guessInput.style.borderColor = color;
}

