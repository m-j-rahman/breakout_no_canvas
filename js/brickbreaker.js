const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const livesDisplay = document.querySelector('#lives')

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

const ballDiameter = 20
const ballRadius = 10
const ballWidth = 20
const ballHeight = 20
const ballCollisionWidth = ballWidth * 0.80
const ballCollisionHeight = ballHeight * 0.80
const ballCollisionXOffset = (ballWidth - ballCollisionWidth) / 2
const ballCollisionYOffset = (ballHeight - ballCollisionHeight) / 2

let xDirection = -2
let yDirection = 2
let xyFlip = 0

const userStart = [230, 10]
let userCurrentPosition = userStart

let userWidth = 100;
let userHeight = 20
const userCollisionWidth = userWidth * 0.80
const userCollisionHeight = userHeight * 0.80
const userCollisionXOffset = (userWidth - userCollisionWidth) / 2
const userCollisionYOffset = (userHeight - userCollisionHeight) / 2

const boardWidth = 560
const boardHeight = 300

const blockWidth = 100
const blockHeight = 20
const blockCollisionWidth = blockWidth * 0.80
const blockCollisionHeight = blockHeight * 0.80
const blockCollisionXOffset = (blockWidth - blockCollisionWidth) / 2
const blockCollisionYOffset = (blockHeight - blockCollisionHeight) / 2

let gameState = 'initial'
let lastKeyPress = ''

let score = 0;
let lives = 3;

// add user
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);

//add pause menu
const menu = document.createElement('div')
menu.classList.add('menu')
menu.style.display = 'none'
grid.appendChild(menu)

//add win menu
const winMenu = document.createElement('div')
winMenu.classList.add('winMenu')
grid.appendChild(winMenu)

//add lose menu
const loseMenu = document.createElement('div')
loseMenu.classList.add('loseMenu')
grid.appendChild(loseMenu)

//draw User
function drawUser() {
    user.style.left = userCurrentPosition[0] + 'px'
    user.style.bottom = userCurrentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + "px";
    ball.style.bottom = ballCurrentPosition[1] + "px";
}

//my block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
        this.topLeft = [xAxis, yAxis + blockHeight];
    }
}

//all my blocks
let blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

//draw my blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.left = blocks[i].bottomLeft[0] + "px";
        block.style.bottom = blocks[i].bottomLeft[1] + "px";
        block.style.backgroundColor = generateRandomColor();
        grid.appendChild(block);
    }
}
addBlocks();

function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startStopwatch() {
    let time = 0;
    let timer = setInterval(function () {
        if (gameState == 'playing') {
            time++;
            document.getElementById("count").innerHTML = "Timer:" + time + "s";
        }
    }, 1000);
}
startStopwatch();

//check for ball collisions
function checkForCollisions() {
    let ballLeft = ballCurrentPosition[0] + ballCollisionXOffset;
    let ballRight = ballLeft + ballCollisionWidth;
    let ballBottom = ballCurrentPosition[1] + ballCollisionYOffset;
    let ballTop = ballBottom + ballCollisionHeight;

    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        const j = i;
        let blockLeft = blocks[j].bottomLeft[0] + blockCollisionXOffset;
        let blockRight = blockLeft + blockCollisionWidth;
        let blockBottom = blocks[j].bottomLeft[1] + blockCollisionYOffset;
        let blockTop = blockBottom + blockCollisionHeight;

        if (ballTop >= blockBottom || ballBottom >= blockTop) {
            if (ballRight >= blockLeft && ballLeft <= blockRight) {
                let allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[j].classList.add('removed')
                allBlocks[j].classList.remove('block')
                blocks.splice(j, 1)
                changeDirection("block")
                // score display
                score++
                scoreDisplay.innerHTML = "Score: " + score
                // if blocks are all removed, then gameover, user wins
                if (blocks.length === 0) {
                    gameState = 'win'
                    document.getElementById('winMenu').style.display = 'block'
                }
            }
        }
    }

    // check for wall hits
    if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        changeDirection("ceiling")
    } else if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= (boardWidth - ballDiameter)) {
        changeDirection("wall")
    } else if (ballCurrentPosition[1] === 0) {
        // lives handled
        lives--
        gameState = 'reset'
        // game over
        if (lives === 0) {
            gameState = 'lose'
        }
    }
    //check for user collision
    let userLeft = userCurrentPosition[0] + userCollisionXOffset;
    let userRight = userLeft + userCollisionWidth;
    let userBottom = userCurrentPosition[1] + userCollisionYOffset;
    let userTop = userBottom + userCollisionHeight;

    if (ballBottom < userTop) {
        if (ballRight > userLeft && ballLeft < userRight) {
            changeDirection("userTop")
            if ((userBottom < ballBottom) && (userTop > ballBottom)) {
                if ((userLeft <= ballRight) && (userLeft >= ballLeft)) {
                    changeDirection("userLeft")
                } else if ((userRight <= ballLeft) && (userRight >= ballRight)) {
                    changeDirection("userRight")
                }
            }
        }
    }
}

function changeDirection(deflected = "") {
    xInitial = xDirection
    yInitial = yDirection

    switch (deflected) {
        case "wall":
            xDirection = xInitial * -1
            break;
        case "ceiling":
            yDirection = -2
            break;
        case "userTop":
            yDirection = 2
            break;
        case "block":
            if (xyFlip === 0) {
                xyFlip = 1
                xDirection = xInitial * -1
            } else if (xyFlip === 1) {
                xyFlip = 0
                yDirection = yInitial * -1
            }
            break;
        case "userLeft":
            yDirection = 2
            xDirection = xInitial * -1
            break;
        case "userRight":
            yDirection = 2
            xDirection = xInitial * -1
            break;
        default:
            console.log("unhandled deflection: " + deflected)
            break;
    }
}

function updateGameState() {
    switch (gameState) {
        case 'restart':
            console.log('restart')
            window.location.reload()
            gameState = "initial"
            break;
        case 'pause':
            console.log('pause')
            break;
        case 'playing':
            console.log('playing')
            ballCurrentPosition[0] += xDirection
            ballCurrentPosition[1] += yDirection
            checkForCollisions()
            switch (lastKeyPress) {
                case 'left':
                    if (userCurrentPosition[0] > 0) {
                        userCurrentPosition[0] -= 5
                        // lastKeyPress = '';
                    }
                    break;
                case 'right':
                    if (userCurrentPosition[0] < (boardWidth - blockWidth)) {
                        userCurrentPosition[0] += 5
                        // lastKeyPress = '';
                    }
                    break;
            }
            // having this in wrecks performance, need to google about js animation acceleration
            // lastKeyPress = ''; 

            break;
        case 'reset':
            console.log('reset')
            userCurrentPosition = [230, 10]
            ballCurrentPosition = [270, 40]
            gameState = 'playing'
            break;
        default:
            console.log('unknown game state: ', gameState)
    }
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 's':
            gameState = 'playing'
            break;
        case 'p':
            gameState = 'pause'
            break;
        case 'r':
            gameState = 'restart'
            break;
        case 'ArrowLeft':
            lastKeyPress = 'left'
            break;
        case 'ArrowRight':
            lastKeyPress = 'right'
            break;
        default:
            console.log('unknown key pressed: ' + e.key)
    }
})


document.addEventListener('keyup', e => {
    switch (e.key) {

        case 'ArrowLeft':
            lastKeyPress = ''
            break;
        case 'ArrowRight':
            lastKeyPress = ''
            break;
        default:
            console.log('unknown key pressed: ' + e.key)
    }
})

function draw() {
    livesDisplay.innerHTML = "Lives: " + lives
    switch (gameState) {
        case 'playing':
            document.getElementById('loseMenu').style.display = 'none'
            document.getElementById('winMenu').style.display = 'none'
            document.getElementById('menu').style.display = 'none'
            drawUser()
            drawBall()
            break;
        case 'lose':
            document.getElementById('loseMenu').style.display = 'block'
            break;
        case 'win':
            document.getElementById('winMenu').style.display = 'block'
            break;
        case 'pause':
            document.getElementById('menu').style.display = 'block'
            break;
        case 'initial':
            drawUser()
            drawBall()
            break;
    }
}

function loop() {
    updateGameState()
    draw()
    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)
