const tileDisplay = document.querySelector('.tile-container')
const keyBoard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'SUPER'


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;


guessRows.forEach((guessRow, guessRowIndex) => {
    const rowEl = document.createElement('div')
    rowEl.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileEl = document.createElement('div')
        tileEl.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileEl.classList.add('tile')
        rowEl.append(tileEl)
    })
    tileDisplay.append(rowEl)
})

const handleClick = (letter) => {
    //console.log('clicked', letter);
    if (letter === '«') {
        deleteLetter()
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log(guessRows);
    }
}

keys.forEach(key => {
    const buttonEl = document.createElement('button')
    buttonEl.innerText = key
    buttonEl.setAttribute('id', key)
    buttonEl.addEventListener('click', () => handleClick(key))
    keyBoard.append(buttonEl)
})

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile > 4) {
        if (wordle == guess) {
            showMessage('GREAT!!!!')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = true
                showMessage('GREAT!!!')
                return
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageEl = document.createElement('p')
    messageEl.textContent = message
    messageDisplay.append(messageEl)
    setTimeout(() => messageDisplay.removeChild(messageEl), 2500)
}