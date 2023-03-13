const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let gridLeft = grid.getBoundingClientRect().left
let gridRight = grid.getBoundingClientRect().right

console.log(gridLeft, gridRight);


const blockWidth = 100
const blockHeight = 20

const boardWidth = 600
let boardHeight = 300

const ballDiameter = 20

const userStartPos = [230, 10]
let currentPosition = userStartPos

const ballStartPos = [270, 40]
let ballCurrentPosition = ballStartPos

let timerId

let xDirection = 2
let yDirection = 2


// Create Block

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
// all the blocks

const blocks = [
    new Block(10, 270),
    new Block(130, 270),
    new Block(250, 270),
    new Block(370, 270),
    new Block(490, 270),
    new Block(10, 240),
    new Block(130, 240),
    new Block(250, 240),
    new Block(370, 240),
    new Block(490, 240),
    new Block(10, 210),
    new Block(130, 210),
    new Block(250, 210),
    new Block(370, 210),
    new Block(490, 210),
]

//Add Block

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

// Add User

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// Draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// Move user

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// Add ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// Draw ball

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// Move ball

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollision()
}

timerId = setInterval(moveBall, 30)


// check for collision

function checkForCollision(params) {
    if (
        ballCurrentPosition[0] > (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] > (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
    ) {
        changeDirection()
    }
   
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerText = 'You Lost!!!'
    }

}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        xDirection = 2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        yDirection = 2
        return
    }
}



