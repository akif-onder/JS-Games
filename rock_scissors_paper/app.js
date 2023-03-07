const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const result = document.getElementById('result')

const possibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoice




possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1 // 3

    if (randomNumber === 1) {
        computerChoice = 'rock'
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors'
    }
    if (randomNumber === 3) {
        computerChoice = 'paper'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if (computerChoice !== undefined && computerChoice === userChoice) {
        result.innerHTML = 'tie'
    }
    if (computerChoice === 'rock' && userChoice === 'paper') {
        result.innerHTML = 'User won!'
    }
    if (computerChoice === 'rock' && userChoice === 'scissors') {
        result.innerHTML = 'Computer won!'
    }
    if (computerChoice === 'paper' && userChoice === 'scissors') {
        result.innerHTML = 'User won!'
    }
    if (computerChoice === 'paper' && userChoice === 'rock') {
        result.innerHTML = 'Computer won!'
    }
    if (computerChoice === 'scissors' && userChoice === 'rock') {
        result.innerHTML = 'User won!'
    }
    if (computerChoice === 'scissors' && userChoice === 'paper') {
        result.innerHTML = 'Computer won!'
    }
}

