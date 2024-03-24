let secretCode;
let currentGuess = [];
let pastGuess = [];

function generateSecretCode() {
    secretCode = [];
    for (let i = 0; i < 4; i++) {
        secretCode.push(Math.floor(Math.random() * 6) + 1); 
    }
    console.log("Secret Code:", secretCode); 
}

function updateColor(boxId, color) {
    const box = document.getElementById(boxId);
    box.className = 'color-box ' + color;
}

function evaluateGuess(guess) {
    if (!secretCode) {
        alert("Secret code is not generated yet.");
        return [];
    }

    const result = [];
    const codeCopy = [...secretCode];
    const guessCopy = [...guess];

    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] === codeCopy[i]) {
            result.push('+');
            guessCopy[i] = null; 
            codeCopy[i] = null;
        }
    }

    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] !== null) {
            const foundIndex = codeCopy.indexOf(guessCopy[i]);
            if (foundIndex !== -1) {
                result.push('-');
                codeCopy[foundIndex] = null; 
            }
        }
    }

    while (result.length < 4) {
        result.push('-');
    }

    return result;
}

function checkGuess() {
    const guess = currentGuess.slice(); 
    if (guess.length < 4) {
        alert("Please fill all color boxes before checking the guess.");
        return;
    }

    const result = evaluateGuess(guess); 
    const resultDisplay = document.getElementById("result");
    resultDisplay.innerHTML = ''; 

    result.forEach(symbol => {
        const symbolElement = document.createElement('span');
        symbolElement.textContent = symbol;
        resultDisplay.appendChild(symbolElement);
    });

    addToGuessLog(guess, result);

    if (result.every(symbol => symbol === '+')) {
        alert("Congratulations! You guessed the code!");
        resetGame(); 
    }
}

function addToGuessLog(guess, result) {
    const guessLog = document.getElementById("guess-list");
    const guessItem = document.createElement('li');
    const guessText = document.createTextNode(`Guess: ${guess.join(', ')} - Result: ${result.join('')}`);
    guessItem.appendChild(guessText);
    guessLog.appendChild(guessItem);
}

function selectColor(colorBox) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const currentColor = colorBox.className.split(' ')[1]; 

    let currentIndex = colors.indexOf(currentColor);
    if (currentIndex === -1) currentIndex = 0; 

    const nextColor = colors[(currentIndex + 1) % colors.length]; 
    colorBox.className = 'color-box ' + nextColor; 
    updateCurrentGuess(); 
}

function updateCurrentGuess() {
    currentGuess = []; 
    const colorBoxes = document.querySelectorAll('.color-box'); 
    colorBoxes.forEach(colorBox => {
        const color = colorBox.className.split(' ')[1]; 
        const colorIndex = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'].indexOf(color); 
        currentGuess.push(colorIndex + 1); 
    });
}

function resetGame() {
    currentGuess = [];
    pastGuess = [];
    secretCode = null; // Reset the secret code
    document.querySelectorAll('.color-box').forEach(box => {
        box.className = 'color-box';
    });
    document.getElementById("result").innerHTML = "";
    document.getElementById("guess-list").innerHTML = "";
}

