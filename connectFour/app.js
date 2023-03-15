const playerRed = 'R'
const playerYellow = 'Y'
const restartButton = document.getElementById('restart')
const boardDisplay = document.getElementById('board')
const winner = document.getElementById('winner')

let currentPlayer = playerRed

let gameOver = false
let board
let currentColumns

let rows = 6
let columns = 7

 window.onload = function () {
    setGame()
}

function setGame() {
    board = []
    currentColumns = [5, 5, 5, 5, 5, 5, 5]

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            row.push(' ')

            let tile = document.createElement('div')
            tile.id = r.toString() + '-' + c.toString()
            tile.classList.add('tile')
            tile.addEventListener('click', setPiece)
            boardDisplay.append(tile)

        }
        board.push(row)
    }
}

function setPiece() {
    if (gameOver) {
        return
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0])
    let c = parseInt(coords[1])

    r = currentColumns[c]
    if (r < 0) {
        return
    }

    board[r][c] = currentPlayer;

    let tile = document.getElementById(r.toString() + '-' + c.toString())
    if (currentPlayer == playerRed) {
        tile.classList.add('red-piece')
        currentPlayer = playerYellow
    }
    else {
        tile.classList.add('yellow-piece')
        currentPlayer = playerRed
    }
    r -= 1 // updating row height for the column
    currentColumns[c] = r // updaeting the array

    checkWinner()
}

function checkWinner() {
    //horizontal check
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }
    //vertical check
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2 ][c] == board[r + 3][c]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    
    if (board[r][c] == playerRed) {
        winner.innerText = 'Red Wins!!!'
    }
    else{
        winner.innerText = 'Yellow Wins!!!'
    }

    gameOver = true
    
}

