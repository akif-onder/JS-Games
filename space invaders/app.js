let tileSize = 32

let rows = 16
let columns = 16

let board
let boardWidth = tileSize * columns
let boardHeight = tileSize * rows
let context;


let shipWidth = tileSize * 2
let shipHeight = tileSize
let shipX = tileSize * columns/2 - tileSize
let shipY = tileSize * rows - tileSize * 2

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}

let shipImg;
let shipVelocityX = tileSize

//aliens

let alienArrray = []
let alienWidth = tileSize * 2
let alienHeight = tileSize
let alienX = tileSize
let alienY = tileSize

let alienImg;

let alienRows = 2;
let alienColumns = 3;  
let alienCount = 0; // number of aliens to defeat
let alienVelocityX = 1; //moving speed

window.onload = function () {
    board = document.getElementById('board')
    board.width = boardWidth
    board.height = boardHeight
    context = board.getContext("2d") // for drawing on the board

 
    // draw initial ship
    //context.fillStyle = "green"
    //context.fillRect(ship.x, ship.y, ship.width, ship.height)

    shipImg = new Image()
    shipImg.src = "./images/ship.png"
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)
    }
    
    alienImg = new Image()
    alienImg.src = "./images/alien.png"
    
    createAliens()



    requestAnimationFrame(update)
    document.addEventListener('keydown', moveShip)
} 

function update() {
    requestAnimationFrame(update)

    context.clearRect(0, 0, board.width, board.height)
    //ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)

    //alien
    for (let i = 0; i < alienArrray.length; i++) {
        let alien = alienArrray[i];
        if (alien.alive) {
            alien.x += alienVelocityX
            // keeps aliens in the board
            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height)
        }
        
    }
}

function moveShip(e) {
    if (e.key == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX
    } else if(e.key == "ArrowRight" && ship.x + shipWidth + shipVelocityX <= board.width){
        ship.x += shipVelocityX
    }
}

 function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
           let alien = {
            img: alienImg,
            x: alienX + c*alienWidth,
            y: alienY + r*alienHeight,
            width: alienWidth,
            height: alienHeight,
            alive: true 
           } 
           alienArrray.push(alien)
        }
    }
    alienCount = alienArrray.length
 }