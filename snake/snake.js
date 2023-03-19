import {getInputDirection} from './input.js'

export const SNAKE_SPEED = 3

const snakeBody = [
    {x:11, y:11},
    {x:11, y:12},
    {x:11, y:13},
    {x:11, y:14},
    {x:11, y:15},
    {x:11, y:16},
]


export function updateSnake() {
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