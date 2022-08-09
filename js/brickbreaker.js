const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const livesDisplay = document.querySelector('#lives')
const pauseMenu = document.querySelector('#menu')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let resetUser
let score = 0
let lives = 3
let playing = false
let shouldUserReset = false
let shouldBallPause = false

//my block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
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
]

//draw my blocks
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

//add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//add pause menu
const menu = document.createElement('div')
menu.classList.add('menu')
grid.appendChild(menu)
// drawMenu()

//draw User
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//draw menu
// function drawMenu() {
//     document.getElementById('menu').style.left = 500
//     document.getElementById('menu').style.bottom = 100
// }

document.addEventListener('keydown', (event) => {
    //starts game
    if (event.key === 's') {
        //move user
        function moveUser(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (currentPosition[0] > 0) {
                        currentPosition[0] -= 10
                        drawUser()
                        resetUser = window.requestAnimationFrame(moveUser)
                    }
                    break
                case 'ArrowRight':
                    if (currentPosition[0] < (boardWidth - blockWidth)) {
                        currentPosition[0] += 10
                        drawUser()
                        resetUser = window.requestAnimationFrame(moveUser)
                    }
                    break
                    //pauses user
                case 'p':
                    console.log('pauseUser')
                    shouldBallPause = true
                    document.getElementById('menu').style.display = 'block'
                    document.removeEventListener('keydown', moveUser)        
            }
            resetUser = window.requestAnimationFrame(moveUser)
        }
        document.addEventListener('keydown', moveUser)

        //move ball
        let shouldBallReset = false
        function moveBall() {
            if (shouldBallReset === false) {
                ballCurrentPosition[0] += xDirection
                ballCurrentPosition[1] += yDirection
                drawBall()
                checkForCollisions()
                timerId = window.requestAnimationFrame(moveBall)
            } else if (shouldBallReset === true) {
                ballCurrentPosition = [270, 40]
                shouldBallReset = false
                drawBall()
                checkForCollisions()
                timerId = window.requestAnimationFrame(moveBall)
            }
            //pauses ball
            if (shouldBallPause) {
                console.log('pauseBall')
                window.cancelAnimationFrame(timerId)
            }
        }
        timerId = window.requestAnimationFrame(moveBall)

        //check for collisions
        function checkForCollisions() {
            //check for block collision
            for (let i = 0; i < blocks.length; i++) {
                if
                    (
                    (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
                    ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
                ) {
                    const allBlocks = Array.from(document.querySelectorAll('.block'))
                    allBlocks[i].classList.remove('block')
                    blocks.splice(i, 1)
                    changeDirection()
                    score++
                    scoreDisplay.innerHTML = "Score: " + score
                    if (blocks.length == 0) {
                        scoreDisplay.innerHTML = 'You Win!'
                        window.cancelAnimationFrame(timerId)
                        document.removeEventListener('keydown', moveUser)
                    }
                }
            }
            // check for wall hits
            if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
                changeDirection()
            }

            //check for user collision
            if
                (
                (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
                (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
            ) {
                changeDirection()
            }

            //game over
            if (ballCurrentPosition[1] <= 0) {
                lives--
                livesDisplay.innerHTML = "Lives: " + lives
                currentPosition = [230, 10]
                drawUser()
                shouldBallReset = true

            }
            if (lives === 0) {
                scoreDisplay.innerHTML = 'You lose!'
                document.removeEventListener('keydown', moveUser)
                shouldBallReset = true
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
                yDirection = 2
                return
            }
            if (xDirection === -2 && yDirection === 2) {
                xDirection = 2
                return
            }
        }
    }
});