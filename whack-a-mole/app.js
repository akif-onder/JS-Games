const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
console.log(squares);
// I will add a start game button.
// add users
// add scoreboard
// add time input (how long do you want the game to be??)

let result = 0

let hitPosition

let currentTime = 10

let timerId = null

let seenTime = 1500

let accelaration = 500

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomPosition = squares[Math.floor(Math.random() * 9)]
   
    randomPosition.classList.add('mole')

    hitPosition = randomPosition.id
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id == hitPosition) {
            result ++
            score.textContent = result
            hitPosition = null
        }
    })
})

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime == 0) {
        
        currentTime = 10
        seenTime = seenTime - accelaration
    }
    if (seenTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('Game over. Your point is ' + result)
    }
}

function moveMole() {
    if (seenTime > 0) {
        timerId = setInterval(randomSquare, seenTime)
    }    
}

let countDownTimerId = setInterval(countDown, 1000)

moveMole()