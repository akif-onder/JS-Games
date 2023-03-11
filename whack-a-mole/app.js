const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')


let result = 0

let hitPosition

let currentTime = 5 

let timerId = null

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

function moveMole() {

    timerId =setInterval(randomSquare,1000)
}

moveMole()

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('Game Over. Your score is ' + result)
    }
}

let countDownTimerId = setInterval(countDown, 1000)