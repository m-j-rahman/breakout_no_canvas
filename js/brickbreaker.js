const GRID = document.querySelector('.grid')
const SCORE_DISPLAY = document.querySelector('#score')
const LIVES_DISPLAY = document.querySelector('#lives')

const BOARD_WIDTH = 560
const BOARD_HEIGHT = 300

const BALL_START = [270, 40];
let ballCurrentPosition = BALL_START;
const BALL_DIAMETER = 20
const BALL_RADIUS = 10
const BALL_WIDTH = 20
const BALL_HEIGHT = 20
const BALL_COLLISION_WIDTH = BALL_WIDTH * 0.80
const BALL_COLLISION_HEIGHT = BALL_HEIGHT * 0.80
const BALL_COLLISION_X_OFFSET = (BALL_WIDTH - BALL_COLLISION_WIDTH) / 2
const BALL_COLLISION_Y_OFFSET = (BALL_HEIGHT - BALL_COLLISION_HEIGHT) / 2

let xDirection = -2
let yDirection = 2
let xyFlip = 0

const USER_START = [230, 10]
let userCurrentPosition = USER_START
let userWidth = 100;    //variable to allow for changing size with powerups later
let userHeight = 20     //variable to allow for changing size with powerups later
const USER_COLLISION_WIDTH = userWidth * 0.80
const USER_COLLISION_HEIGHT = userHeight * 0.80
const USER_COLLISION_X_OFFSET = (userWidth - USER_COLLISION_WIDTH) / 2
const USER_COLLISION_Y_OFFSET = (userHeight - USER_COLLISION_HEIGHT) / 2

const BLOCK_WIDTH = 100
const BLOCK_HEIGHT = 20
const BLOCK_COLLISION_WIDTH = BLOCK_WIDTH * 0.80
const BLOCK_COLLISION_HEIGHT = BLOCK_HEIGHT * 0.80
const BLOCK_COLLISION_X_OFFSET = (BLOCK_WIDTH - BLOCK_COLLISION_WIDTH) / 2
const BLOCK_COLLISION_Y_OFFSET = (BLOCK_HEIGHT - BLOCK_COLLISION_HEIGHT) / 2

let gameState = 'initial'
let lastKeyPress = ''
let score = 0;
let lives = 3;

// add user
const USER = document.createElement("div");
USER.classList.add("user");
GRID.appendChild(USER);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
GRID.appendChild(ball);

//add pause menu
const menu = document.createElement('div')
menu.classList.add('menu')
menu.style.display = 'none'
GRID.appendChild(menu)

//add win menu
const winMenu = document.createElement('div')
winMenu.classList.add('winMenu')
GRID.appendChild(winMenu)

//add lose menu
const loseMenu = document.createElement('div')
loseMenu.classList.add('loseMenu')
GRID.appendChild(loseMenu)

//draw User
function drawUser() {
    USER.style.left = userCurrentPosition[0] + 'px'
    USER.style.bottom = userCurrentPosition[1] + 'px'
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
        this.bottomRight = [xAxis + BLOCK_WIDTH, yAxis];
        this.topRight = [xAxis + BLOCK_WIDTH, yAxis + BLOCK_HEIGHT];
        this.topLeft = [xAxis, yAxis + BLOCK_HEIGHT];
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
        GRID.appendChild(block);
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
    let ballLeft = ballCurrentPosition[0] + BALL_COLLISION_X_OFFSET;
    let ballRight = ballLeft + BALL_COLLISION_WIDTH;
    let ballBottom = ballCurrentPosition[1] + BALL_COLLISION_Y_OFFSET;
    let ballTop = ballBottom + BALL_COLLISION_HEIGHT;

    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        const j = i;
        let blockLeft = blocks[j].bottomLeft[0] + BLOCK_COLLISION_X_OFFSET;
        let blockRight = blockLeft + BLOCK_COLLISION_WIDTH;
        let blockBottom = blocks[j].bottomLeft[1] + BLOCK_COLLISION_Y_OFFSET;
        let blockTop = blockBottom + BLOCK_COLLISION_HEIGHT;

        if (ballTop >= blockBottom || ballBottom >= blockTop) {
            if (ballRight >= blockLeft && ballLeft <= blockRight) {
                let allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[j].classList.add('removed')
                allBlocks[j].classList.remove('block')
                blocks.splice(j, 1)
                changeDirection("block")
                // score display
                score++
                SCORE_DISPLAY.innerHTML = "Score: " + score
                // if blocks are all removed, then gameover, user wins
                if (blocks.length === 0) {
                    gameState = 'win'
                    document.getElementById('winMenu').style.display = 'block'
                }
            }
        }
    }

    // check for wall hits
    if (ballCurrentPosition[1] >= (BOARD_HEIGHT - BALL_DIAMETER)) {
        changeDirection("ceiling")
    } else if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= (BOARD_WIDTH - BALL_DIAMETER)) {
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
    let userLeft = userCurrentPosition[0] + USER_COLLISION_X_OFFSET;
    let userRight = userLeft + USER_COLLISION_WIDTH;
    let userBottom = userCurrentPosition[1] + USER_COLLISION_Y_OFFSET;
    let userTop = userBottom + USER_COLLISION_HEIGHT;

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

// controls
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 's':
            if (gameState !== 'lose' && gameState !== 'win') {      //prevents infinite playing in lose and win states
                gameState = 'playing'
            }
            break;
        case 'p':
            if (gameState !== 'lose' && gameState !== 'win') {      //prevents infinite playing in lose and win states
                gameState = 'pause'
            }
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
            console.log('unknown keydown pressed: ' + e.key)
    }
})

// stops user moving when key is let go
document.addEventListener('keyup', e => {
    switch (e.key) {
        case 'ArrowLeft':
            lastKeyPress = ''
            break;
        case 'ArrowRight':
            lastKeyPress = ''
            break;
        default:
            console.log('unknown keyup pressed: ' + e.key)
    }
})

function updateGameState() {
    switch (gameState) {
        case 'restart':
            console.log('restart')
            window.location.reload()
            gameState = 'initial'
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
                    }
                    break;
                case 'right':
                    if (userCurrentPosition[0] < (BOARD_WIDTH - BLOCK_WIDTH)) {
                        userCurrentPosition[0] += 5
                    }
                    break;
            }
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

function draw() {
    LIVES_DISPLAY.innerHTML = "Lives: " + lives
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
