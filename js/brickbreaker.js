// 1. Evaluate game state
// 2. Update the game state based on inputs
// 3. Draw the next frame based on the result of 2
// 4. Recurse

// Key components:
// - Game State 
//    - everything that isn't about taking inputs or drawing stuff
//    - ball position/direction/speed + block visibility + user position/direction/speed + pause menu visibility + round timer + lives + win/loss + score
// - How user inputs happen
//    - Interrupt driven?
//    - Queue driven?
//      - FIFO?
//      - LastWins?
// - Drawing
//    - anything that the user will see counts as drawing
// - Recursion
//    - the main game function needs to be able to be called recursively

// game state goes here
// I am the home of the globals
let started = false
let paused = false
let needRestart = false
let lastKeyPress = ''

const userStart = [230, 10]
let userCurrentPosition = userStart

const boardWidth = 560
const boardHeight = 300

const blockWidth = 100
const blockHeight = 20
const blockCollisionWidth = blockWidth * 0.80
const blockCollisionHeight = blockHeight * 0.80
const blockCollisionXOffset = (blockWidth - blockCollisionWidth) / 2
const blockCollisionYOffset = (blockHeight - blockCollisionHeight) / 2

const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
// end -- game state goes here

function updateGameState() {
    switch (lastKeyPress) {
    case 'left':
        if (userCurrentPosition[0] > 0) {
            userCurrentPosition[0] -= 5
        }
    case 'right':
        if (userCurrentPosition[0] < (boardWidth - blockWidth)) {
            userCurrentPosition[0] += 5
        }
    }
    // see update for owned concepts
}

// event listeners go here
// i contain event listener functions that update the game state out of band
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 's':
            started = true
        case 'p':
            paused = true
        case 'r':
            needRestart = true
        case 'ArrowLeft':
            lastKeyPress = 'left'
        case 'ArrowRight':
            lastKeyPress = 'right'
        default:
            console.log('unkown key pressed:' + e.key)
    }
})
// end -- event listeners go here

function draw() {
    if (started && !paused) {
        drawUser()
    }
    // see draw for owned concepts
}

function loop() {
    updateGameState()
    draw()

    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)


const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const livesDisplay = document.querySelector('#lives')

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

let userWidth = 100;
let userHeight = 20
const userCollisionWidth = userWidth * 0.80
const userCollisionHeight = userHeight * 0.80
const userCollisionXOffset = (userWidth - userCollisionWidth) / 2
const userCollisionYOffset = (userHeight - userCollisionHeight) / 2

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerBall;
let timerUser;
let score = 0;
let lives = 3;
let pause = false;
let reset = false;
let playing = false;
let lose = false;
let win = false;
let restartGame = false;

let count = 0;
let countCheck = false;

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

//add user


//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

//add pause menu
const menu = document.createElement('div')
menu.classList.add('menu')
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

function generateRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function startStopwatch() {
    let time = 0;
    let timer = setInterval(function () {
        if (playing) {
            time++;
            document.getElementById("count").innerHTML = "Timer:" + time + "s";
        }
    }, 1000);
}
startStopwatch();

//moves ball
function moveBall() {
    if (lose || win || pause) {
        cancelAnimationFrame(moveBall)
    }
    if (pause === false) {
        if (playing === false) {  // resets ball to start position, and cancels ball animation
            cancelAnimationFrame(moveBall)
            ballCurrentPosition = [270, 40]
        }
        if (reset === false) { // normal movement of the ball when reset and pause are false
            ballCurrentPosition[0] += xDirection
            ballCurrentPosition[1] += yDirection
            drawBall()
            checkForCollisions()
            requestAnimationFrame(moveBall)
        } else { // resets the ball to the start position if reset is true
            ballCurrentPosition = [270, 40]
            reset = false
            drawBall()
            checkForCollisions()
            requestAnimationFrame(moveBall)
        }
        //resets pause to false
    } else {
        pause = false
    }
}


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
                    playing = false
                    win = true
                    restartGame = true
                    document.getElementById('winMenu').style.display = 'block'
                }
                // }
            }
        }
    }

    // check for wall hits
    if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        changeDirection("ceiling")
    } else if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= (boardWidth - ballDiameter)) {
        changeDirection("wall")
    } else if (ballCurrentPosition[1] === 0) {
        // lives handled and user position reset to start
        lives--
        livesDisplay.innerHTML = "Lives: " + lives
        userCurrentPosition = [230, 10]
        drawUser()
        reset = true
        // game over
        if (lives === 0) {
            playing = false
            restartGame = true
            lose = true
            document.getElementById('loseMenu').style.display = 'block'
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

//restarts game
function restart(e) {
    if (restartGame || !pause) {
        if (e.key === 'r') {
            window.location.reload()
        }
    }
}
document.addEventListener('keydown', restart)

document.addEventListener('keydown', (event) => {
    //starts game
    if (playing === false && restartGame === false) {
        if (event.key === 's') {
            playing = true
            if (pause === false) { // hides menu, and adds event listener for user movement
                document.getElementById('menu').style.display = 'none'
                document.addEventListener('keydown', moveUser)
            }
            //moves user/paddle
            function moveUser(e) {
                if (reset === true) { // resets user to starting position
                    userCurrentPosition = [230, 10]
                    drawUser()
                    document.addEventListener('keydown', moveUser)
                }
                if (win || lose) { // pauses user movement when win or lose are true
                    document.removeEventListener('keydown', moveUser)
                }
                switch (e.key) {
                    case 'ArrowLeft':
                        if (userCurrentPosition[0] > 0) {
                            userCurrentPosition[0] -= 5
                            drawUser()
                        }
                        break
                    case 'ArrowRight':
                        if (userCurrentPosition[0] < (boardWidth - blockWidth)) {
                            userCurrentPosition[0] += 5
                            drawUser()
                        }
                        break

                    //pauses user
                    case 'p':
                        if (playing) {
                            pause = true
                            playing = false
                        }
                        if (pause) {
                            // restartGame = true
                            document.getElementById('menu').style.display = 'block'
                            document.removeEventListener('keydown', moveUser)
                        } else if (pause === false) {
                            document.addEventListener('keydown', moveUser)
                            playing = true
                        }
                        break
                }
            }

            moveBall()
            window.requestAnimationFrame(moveBall)
            checkForCollisions()
            changeDirection()
        }
    }
});
