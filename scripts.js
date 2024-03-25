class MastermindGame {
    constructor() {
        this.secretCode = null;
        this.currentGuess = [];
        this.pastGuess = [];
        //adds variables
    }

    generateSecretCode() {
        this.secretCode = [];
        for (let i = 0; i < 4; i++) {
            this.secretCode.push(Math.floor(Math.random() * 6) + 1);
         //generates secret code numbers randomly   
        }
        console.log("Secret Code:", this.secretCode);
    }

    evaluateGuess(guess) {
        if (!this.secretCode) {
            alert("Secret code is not generated yet. Please press begin game.");
            return [];
            //alerts user if they haven't clicked begin game yet
        }

        const result = [];
        const codeCopy = [...this.secretCode];
        const guessCopy = [...guess];

        for (let i = 0; i < guessCopy.length; i++) {
            if (guessCopy[i] === codeCopy[i]) {
                result.push('+');
                guessCopy[i] = null;
                codeCopy[i] = null;
                //compares same code same place between secret code and the guess -- removes that index if so
            }
        }

        for (let i = 0; i < guessCopy.length; i++) {
            if (guessCopy[i] !== null) {
                const foundIndex = codeCopy.indexOf(guessCopy[i]);
                if (foundIndex !== -1) {
                    result.push('x');
                    codeCopy[foundIndex] = null;
                    //checks for right color right place and if so removes it from the code
                }
            }
        }

        while (result.length < 4) {
            result.push('-');
            //fills the empty spaces
        }

        return result;
    }

    checkGuess() {
        const guess = this.currentGuess.slice();
        if (guess.length < 4) {
            alert("Please fill all color boxes before checking the guess.");
            return;
            //if the user leaves a white box, alerts them
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
            alert("Congratulations! You guessed the code!");
            this.resetGame();
        }
        //if they get them all right, there's a popup and the game resets
    }

    addToGuessLog(guess, result) {
        const guessLog = document.getElementById("guess-list");
        const guessItem = document.createElement('li');
        const guessText = document.createTextNode(`Guess: ${guess.join(', ')} - Result: ${result.join('')}`);
        guessItem.appendChild(guessText);
        guessLog.appendChild(guessItem);
        //adds the previous guess and result to the list
    }

    resetGame() {
        this.currentGuess = [];
        this.pastGuess = [];
        this.secretCode = null; // Reset the secret code
        document.querySelectorAll('.color-box').forEach(box => {
            box.className = 'color-box';
        });
        document.getElementById("result").innerHTML = "";
        document.getElementById("guess-list").innerHTML = "";
    }
    //resets everything
}

class ColorBox {
    constructor() {
        this.currentGuess = [];
    }

    updateColor(boxId, color) {
        const box = document.getElementById(boxId);
        box.className = 'color-box ' + color;
    }

    selectColor(colorBox) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const currentColor = colorBox.className.split(' ')[1];

        let currentIndex = colors.indexOf(currentColor);
        if (currentIndex === -1) currentIndex = 0;

        const nextColor = colors[(currentIndex + 1) % colors.length];
        colorBox.className = 'color-box ' + nextColor;
        this.updateCurrentGuess();
        //changes color on click
    }

    updateCurrentGuess() {
        this.currentGuess = [];
        const colorBoxes = document.querySelectorAll('.color-box');
        colorBoxes.forEach(colorBox => {
            const color = colorBox.className.split(' ')[1];
            const colorIndex = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'].indexOf(color);
            this.currentGuess.push(colorIndex + 1);
        });
    }
}

const mastermindGame = new MastermindGame();
const colorBox = new ColorBox();



