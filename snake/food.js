import {onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 1

export function updateFood() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

export function drawFood(gameBoard) {
    const foodPiece = document.createElement('div')
    foodPiece.style.gridRowStart = food.y
    foodPiece.style.gridColumnStart = food.x
    foodPiece.classList.add('food')
    gameBoard.appendChild(foodPiece)
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}