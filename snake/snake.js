import {getInputDirection} from './input.js'

export const SNAKE_SPEED = 5

const snakeBody = [
    {x:11, y:11}
]
let newSegments = 0


export function updateSnake() {
    addSquares()

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i+1] = {...snakeBody[i]}  
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function drawSnake(gameBoard) {
    snakeBody.forEach(square => {
        const snakePiece = document.createElement('div')
        snakePiece.style.gridRowStart = square.y
        snakePiece.style.gridColumnStart = square.x
        snakePiece.classList.add('snake')
        gameBoard.appendChild(snakePiece)
    });
}

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position) {
    return snakeBody.some(square => {
        return equalPositions(square, position)
    })
}

export function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSquares() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0
}