const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const livesDisplay = document.querySelector('#lives')
const blockWidth = 100
const blockHeight = 20

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

const boardWidth = 560
const boardHeight = 300

let userWidth = 100;
let userHeight = 20
const userCollisionWidth = userWidth * 0.80
const userCollisionHeight = userHeight * 0.80
const userCollisionXOffset = (userWidth - userCollisionWidth) / 2
const userCollisionYOffset = (userHeight - userCollisionHeight) / 2

const userStart = [230, 10]
let userCurrentPosition = userStart

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerBall;
let timerUser;
let score = 0;
let lives = 3;
let pause = false;
let reset = false;
let playing = false;
let restart = false;
let lose = false;

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
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
drawUser();

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
document.addEventListener('keydown', (event) => {
    //starts game
    if (playing === false && lose === false) {
        if (event.key === 's') {
            playing = true
            if (pause === false) {
                document.getElementById('menu').style.display = 'none'
                document.addEventListener('keydown', moveUser)
            }
            //restarts game
            function restart(e) {
                if (playing === false) {
                    if (e.key === 'r') {
                        window.location.reload()
                    }
                }
            }
            document.addEventListener('keydown', restart)

            //move user
            function moveUser(e) {
                if (reset === true) {
                    userCurrentPosition = [230, 10]
                    drawUser()
                    document.addEventListener('keydown', moveUser)
                }
                switch (e.key) {
                    case 'ArrowLeft':
                        if (userCurrentPosition[0] > 0) {
                            userCurrentPosition[0] -= 5
                            drawUser()
                            timerUser = window.requestAnimationFrame(moveUser)
                        }
                        break
                    case 'ArrowRight':
                        if (userCurrentPosition[0] < (boardWidth - blockWidth)) {
                            userCurrentPosition[0] += 5
                            drawUser()
                            timerUser = window.requestAnimationFrame(moveUser)
                        }
                        break

                    //pauses user
                    case 'p':
                        if (playing) {
                            pause = true
                            playing = false
                        }
                        if (pause) {
                            document.getElementById('menu').style.display = 'block'
                            document.removeEventListener('keydown', moveUser)
                        } else if (pause === false) {
                            document.addEventListener('keydown', moveUser)
                            playing = true
                        }
                        if (lose) {
                            playing = false
                            document.removeEventListener('keydown', moveUser)
                        }
                        break
                }
                timerUser = window.requestAnimationFrame(moveUser)
            }
            // document.addEventListener('keydown', moveUser)
            moveUser(event)

            //moves ball
            function moveBall() {
                if (lose) {
                    console.log("lose")
                    window.cancelAnimationFrame(timerBall)
                }
                //pauses ball
                if (pause) {
                    window.cancelAnimationFrame(timerBall)
                    pause = false
                } else {
                    // moves ball
                    if (playing === false) {
                        window.cancelAnimationFrame(timerBall)
                        ballCurrentPosition = [270, 40]
                    }
                   
                    // normal movement of the ball
                    if (reset === false) {

                        ballCurrentPosition[0] += xDirection
                        ballCurrentPosition[1] += yDirection
                        drawBall()
                        checkForCollisions()
                        timerBall = window.requestAnimationFrame(moveBall)
                        // resets the ball to the start position if reset is true
                    } else if (reset === true) {
                        ballCurrentPosition = [270, 40]
                        reset = false
                        drawBall()
                        checkForCollisions()
                        timerBall = window.requestAnimationFrame(moveBall)
                    }
                }
            }
            timerBall = window.requestAnimationFrame(moveBall)

            //check for collisions
            function checkForCollisions() {
                //check for block collision
                for (let i = 0; i < blocks.length; i++) {
                    if ((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])) {
                        let allBlocks = Array.from(document.querySelectorAll('.block'))
                        allBlocks[i].classList.add('removed')
                        allBlocks[i].classList.remove('block')
                        blocks.splice(i, 1)
                        changeDirection()
                        score++
                        scoreDisplay.innerHTML = "Score: " + score
                        if (blocks.length === 0) {
                            playing = false
                            document.getElementById('winMenu').style.display = 'block'
                        }
                    }
                }
                // check for wall hits
                if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
                    changeDirection()
                }
                // lives and user reset
                if (ballCurrentPosition[1] === 0) {
                    lives--
                    livesDisplay.innerHTML = "Lives: " + lives
                    userCurrentPosition = [230, 10]
                    drawUser()
                    reset = true
                    // game over
                    if (lives === 0) {
                        playing = false
                        document.getElementById('loseMenu').style.display = 'block'
                        // reset = true
                        lose = true
                    }
                }
                //check for user collision
                let ballLeft = ballCurrentPosition[0] + ballCollisionXOffset;
                let ballRight = ballLeft + ballCollisionWidth;
                let ballTop = ballCurrentPosition[1] + ballCollisionYOffset;
                let ballBottom = ballTop + ballCollisionHeight;

                let userLeft = userCurrentPosition[0] + userCollisionXOffset;
                let userRight = userLeft + userCollisionWidth;
                let userTop = userCurrentPosition[1] + ballCollisionYOffset;
                let userBottom = userTop + userCollisionHeight;
                // console.log("ballTop: ", ballTop, "ballBottom: ", ballBottom, "ballRight: ", ballRight, "ballLeft: ", ballLeft)
                // console.log("userTop: ", userTop, "userBottom: ", userBottom, "userRight: ", userRight, "userLeft: ", userLeft)
                // console.log("ballX: ", ballCurrentPosition[0], "ballY: ", ballCurrentPosition[1])
                // console.log("userX: ", userCurrentPosition[0], "userY: ", userCurrentPosition[1])
                if (ballTop < userBottom) {
                    // console.log("ballTop: ", ballTop," < userBottom: ", userBottom)
                    if (ballRight < userLeft) {
                        // console.log("ballRight: ", ballRight, " < userLeft: ", userLeft)
                        changeDirection()
                    }
                    if (ballLeft < userRight) {
                        // console.log("ballLeft: ", ballLeft, " < userRight: ", userRight)
                        changeDirection()
                    }
                }
            }

            function changeDirection() {
                //TODO: add optional variable in argument to ensure when collisions occur the ball goes up or down. So if ball hits paddle on the side the ball always goes up
                console.log("User: ", userCurrentPosition, "Ball: ", ballCurrentPosition)
                if (xDirection === 2 && yDirection === 2) {
                    yDirection = -2
                    return
                }
                if (xDirection === 2 && yDirection === -2) {
                    xDirection = -2
                    return
                }
                if (xDirection === -2 && yDirection === -2) {
                    yDirection = 2
                    return
                }
                if (xDirection === -2 && yDirection === 2) {
                    xDirection = 2
                    return
                }
            }
        }
    }
});
