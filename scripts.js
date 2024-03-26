class MastermindGame {
    constructor() {
        this.secretCode = null;
        this.currentGuess = [];
        this.pastGuess = [];
    }

    generateSecretCode() {
        this.secretCode = [];
        for (let i = 0; i < 4; i++) {
            this.secretCode.push(Math.floor(Math.random() * 6) + 1);
        }
        //generates 4 secret numbers to represent colors
        console.log("Secret Code:", this.secretCode);
    }

    evaluateGuess(guess) {
        if (!this.secretCode) {
            alert("Secret code is not generated yet.");
            return [];
            //alerts the user if they make a guess before they press begin game to generate the code
        }

        const result = [];
        const codeCopy = [...this.secretCode];
        const guessCopy = [...guess];

        for (let i = 0; i < guessCopy.length; i++) {
            if (guessCopy[i] === codeCopy[i]) {
                result.push('+');
                //adds symbol to result if the code colors and positions map, then removes them so they aren't counted again
                guessCopy[i] = null;
                codeCopy[i] = null;
            }
        }

        for (let i = 0; i < guessCopy.length; i++) {
            if (guessCopy[i] !== null) {
                const foundIndex = codeCopy.indexOf(guessCopy[i]);
                if (foundIndex !== -1) {
                    result.push('x');
                    //adds result just if the color is right, then removes it from the code
                    codeCopy[foundIndex] = null;
                }
            }
        }

        while (result.length < 4) {
            result.push('-');
            //adds - to fill empty space
        }

        return result;
    }

    checkGuess() {
        const guess = this.currentGuess.slice();
        if (guess.length < 4) {
            //makes sure all boxes have been pressed
            alert("Please fill all color boxes before checking the guess.");
            return;
        }

        const result = this.evaluateGuess(guess);
        const resultDisplay = document.getElementById("result");
        resultDisplay.innerHTML = '';

        result.forEach(symbol => {
            const symbolElement = document.createElement('span');
            symbolElement.textContent = symbol;
            resultDisplay.appendChild(symbolElement);
        });

        this.addToGuessLog(guess, result);

        if (result.every(symbol => symbol === '+')) {
            //checks if the code is correct
            alert("Congratulations! You guessed the code!");
            this.resetGame();
        }
    }

    addToGuessLog(guess, result) {
        const guessLog = document.getElementById("guess-list");
        const guessItem = document.createElement('li');
        const guessText = document.createTextNode(`Guess: ${guess.join(', ')} - Result: ${result.join('')}`);
        guessItem.appendChild(guessText);
        guessLog.appendChild(guessItem);
    }

    resetGame() {
        this.currentGuess = [];
        this.pastGuess = [];
        this.secretCode = null; 
        //resets everything
        document.querySelectorAll('.color-box').forEach(box => {
            box.className = 'color-box';
        });
        document.getElementById("result").innerHTML = "";
        document.getElementById("guess-list").innerHTML = "";
        //everything is blank now
    }
}

class ColorBox {
    constructor(mastermindGame) {
        this.mastermindGame = mastermindGame;
    }

    updateColor(boxId, color) {
        const box = document.getElementById(boxId);
        box.className = 'color-box ' + color;
    }

    selectColor(colorBox) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const currentColor = colorBox.className.split(' ')[1];
        //gives a list of colors in order

        let currentIndex = colors.indexOf(currentColor);
        if (currentIndex === -1) currentIndex = 0;
        //indexes the colors

        const nextColor = colors[(currentIndex + 1) % colors.length];
        colorBox.className = 'color-box ' + nextColor;
        //cycles to next color
        this.updateCurrentGuess();
    }

    updateCurrentGuess() {
        this.mastermindGame.currentGuess = [];
        const colorBoxes = document.querySelectorAll('.color-box');
        colorBoxes.forEach(colorBox => {
            const color = colorBox.className.split(' ')[1];
            const colorIndex = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'].indexOf(color);
            this.mastermindGame.currentGuess.push(colorIndex + 1);
            //changes the colors of the box
        });
    }
}

// Usage
const mastermindGame = new MastermindGame();
const colorBox = new ColorBox(mastermindGame);

