let height = 6; //number of guesses
let width = 5; // length of the word

let row = 0; // current guess attempt
let column = 0; // current letter for that attempt

let gameOver = false;
let word = 'CEMRE'

const board = document.getElementById('board')



window.onload = function () {
    initialize()
}

function initialize() {
   
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const tile = document.createElement("span")
            tile.id = r.toString() + "-" + c.toString()
            tile.classList.add('tile')
            tile.innerText = ''
            board.appendChild(tile)
        }
        
    }
    
    // Listen for key press
    document.addEventListener('keyup', (e) => {
        if (gameOver) return
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (column < width) {
                let currentTile = document.getElementById(row.toString() + '-' + column.toString())
                if (currentTile.innerText == '') {
                    currentTile.innerText = e.code[3]
                    column++;
                }
            }
        }else if (e.code == 'Backspace') {
            if (0 < column && column <= width) {
                column--;
            }
            let currentTile = document.getElementById(row.toString() + '-' + column.toString())
            currentTile.innerText = ''
        }else if (e.code == 'Enter') {
            update()
            row++;
            column = 0
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById('answer').innerText = word
        }
    })
}
 
function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currentTile.innerText;

        if (word[c] == letter) {
            currentTile.classList.add("correct");
            correct++;
        } else if (word.includes(letter)) {
            currentTile.classList.add("present")
        } else {
            currentTile.classList.add("absent")
        }

        if (correct == width) {
            gameOver = true 
        }
    }
}