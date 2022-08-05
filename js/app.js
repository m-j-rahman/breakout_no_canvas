// document.addEventListener('DOMContentLoaded', () => {
//   // TODO: we can also get the grid size from user
//   const gridWidth = 10
//   const gridHeight = 20
//   const gridSize = gridWidth * gridHeight

//   // no need to type 200 divs :)
//   const grid = createGrid();
//   let squares = Array.from(grid.querySelectorAll('div'))
//   const startBtn = document.querySelector('.button')
//   // const menu = document.querySelector('.menu')
//   // const span = document.getElementsByClassName('close')[0]
//   const scoreDisplay = document.querySelector('.score-display')
//   const linesDisplay = document.querySelector('.lines-score')
//   let currentRotation = 0
//   const width = 10
//   let score = 0
//   let lines = 0
//   let timerId
//   let nextRandom = 0
//   // let request
//   const colors = ['orange', 'red', 'purple', 'green', 'blue']

//   function createGrid() {
//     // the main grid
//     let grid = document.querySelector(".grid")
//     for (let i = 0; i < gridSize; i++) {
//       let gridElement = document.createElement("div")
//       grid.appendChild(gridElement)
//     }

//     // set base of grid
//     for (let i = 0; i < gridWidth; i++) {
//       let gridElement = document.createElement("div")
//       gridElement.setAttribute("class", "blockBase")
//       grid.appendChild(gridElement)
//     }

//     let miniGrid = document.querySelector(".mini-grid")
//     // Since 16 is the max grid size in which all the Tetrominoes 
//     // can fit in we create one here
//     for (let i = 0; i < 16; i++) {
//       let gridElement = document.createElement("div")
//       miniGrid.appendChild(gridElement);
//     }
//     return grid;
//   }

//   //assign functions to keycodes
//   function control(e) {
//     if (e.keyCode === 40) {
//       let isKeyHeldDown = e.repeat
//       console.log(isKeyHeldDown)
//       if (isKeyHeldDown) {
//         moveDownQuick()
//       } else {
//         console.log(isKeyHeldDown)
//         moveDown()
//       }
//     }
//     if (e.keyCode === 39) {
//       moveRight()
//     }
//     if (e.keyCode === 38) {
//       rotate()
//     }
//     if (e.keyCode === 37) {
//       MoveLeft()
//     }
//   }

//   // the classical behavior is to speed up the block if down button is kept pressed so doing that
//   document.addEventListener('keydown', control)

//   //The Tetrominoes
//   const lTetromino = [
//     [1, gridWidth + 1, gridWidth * 2 + 1, 2],
//     [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
//     [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
//     [gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2]
//   ]

//   const zTetromino = [
//     [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
//     [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1],
//     [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
//     [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1]
//   ]

//   const tTetromino = [
//     [1, gridWidth, gridWidth + 1, gridWidth + 2],
//     [1, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
//     [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
//     [1, gridWidth, gridWidth + 1, gridWidth * 2 + 1]
//   ]

//   const oTetromino = [
//     [0, 1, gridWidth, gridWidth + 1],
//     [0, 1, gridWidth, gridWidth + 1],
//     [0, 1, gridWidth, gridWidth + 1],
//     [0, 1, gridWidth, gridWidth + 1]
//   ]

//   const iTetromino = [
//     [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
//     [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
//     [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
//     [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
//   ]

//   const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

//   //Randomly Select Tetromino
//   let random = Math.floor(Math.random() * theTetrominoes.length)
//   let current = theTetrominoes[random][currentRotation]
//   let selectedBlock
//   for (let i = 0; i < current.length; i++) {
//     selectedBlock = current[i]
//     console.log(selectedBlock)
//   }
  

//   //move the Tetromino moveDown 4, indicates the block falling down from the centre at the top of the grid
//   let currentPosition = 4
//   //draw the shape
//   function draw() {
//     current.forEach(index => {
//       squares[currentPosition + index].classList.add('block')
//       squares[currentPosition + index].style.backgroundColor = colors[random]
//     })
//   }

//   //undraw the shape
//   function undraw() {
//     current.forEach(index => {
//       squares[currentPosition + index].classList.remove('block')
//       squares[currentPosition + index].style.backgroundColor = ''
//     })
//   }

//   let num = 0
//   //move down on loop
//   function moveDown() {
//     num += 1
//     if (num === 25) {
//       num = 0
//       undraw()
//       currentPosition += width
//       draw()
//       freeze()
//     }
//     request = requestAnimationFrame(moveDown)
//   }

//   // moveDownQuick when down arrow is pressed
//   function moveDownQuick() {
//     // console.log(current)
//     // if (selectedBlock(index => squares[currentPosition + index].classList.contains('settledBlock'))) {
//       undraw()
//       currentPosition += width
//       draw()
//       freeze()
//     // }

//     request = requestAnimationFrame(moveDownQuick)
//   }

//   //move right and prevent collisions with shapes moving left
//   function moveRight() {
//     undraw()
//     const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
//     // console.log("INDEX:", squares[currentPosition])
//     if (!isAtRightEdge) currentPosition += 1
//     if (current.some(index => squares[currentPosition + index].classList.contains('settledBlock'))) {

//       currentPosition -= 1
//     }
//     draw()
//   }

//   //move left and prevent collisions with shapes moving right
//   function MoveLeft() {
//     undraw()
//     const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
//     if (!isAtLeftEdge) currentPosition -= 1
//     if (current.some(index => squares[currentPosition + index].classList.contains('settledBlock'))) {
//       currentPosition += 1
//     }
//     draw()
//   }

//   //freeze the shape
//   function freeze() {
//     // if block has settled
//     if (current.some(index => squares[currentPosition + index + width].classList.contains('blockBase') || squares[currentPosition + index + width].classList.contains('settledBlock'))) {
//       // make it settledBlock
//       current.forEach(index => squares[index + currentPosition].classList.add('settledBlock'))
//       // start a new tetromino falling
//       random = nextRandom
//       nextRandom = Math.floor(Math.random() * theTetrominoes.length)
//       current = theTetrominoes[random][currentRotation]
//       currentPosition = 4
//       draw()
//       displayShape()
//       addScore()
//       gameOver()
//     }
//   }

//   freeze()

//   //FIX ROTATION OF TETROMINOS AT THE EDGE 
//   function isAtRight() {
//     return current.some(index => (currentPosition + index + 1) % width === 0)
//   }

//   function isAtLeft() {
//     return current.some(index => (currentPosition + index) % width === 0)
//   }

//   function checkRotatedPosition(P) {
//     P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
//     if ((P + 1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
//       if (isAtRight()) {            //use actual position to check if it's flipped over to right side
//         currentPosition += 1    //if so, add one to wrap it back around
//         checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
//       }
//     }
//     else if (P % width > 5) {
//       if (isAtLeft()) {
//         currentPosition -= 1
//         checkRotatedPosition(P)
//       }
//     }
//   }

//   //Rotate the Tetromino
//   function rotate() {
//     undraw()
//     currentRotation++
//     if (currentRotation === current.length) {
//       currentRotation = 0
//     }
//     current = theTetrominoes[random][currentRotation]
//     checkRotatedPosition()
//     draw()
//   }

//   //show up-next tetromino in mini-grid display
//   const displaySquares = document.querySelectorAll('.mini-grid div')
//   const displayWidth = 4
//   const displayIndex = 0

//   const smallTetrominoes = [
//     [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
//     [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
//     [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
//     [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
//     [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
//   ]

//   function displayShape() {
//     displaySquares.forEach(square => {
//       square.classList.remove('block')
//       square.style.backgroundColor = ''
//     })
//     smallTetrominoes[nextRandom].forEach(index => {
//       displaySquares[displayIndex + index].classList.add('block')
//       displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
//     })
//   }

//   //add score
//   function addScore() {
//     for (let i = 0; i < 199; i += width) {
//       const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

//       if (row.every(index => squares[index].classList.contains('settledBlock'))) {
//         score += 10
//         lines += 1
//         scoreDisplay.innerHTML = score
//         linesDisplay.innerHTML = lines
//         row.forEach(index => {
//           squares[index].classList.remove('settledBlock')
//           squares[index].classList.remove('tetromino')
//           squares[index].style.backgroundColor = ''
//         })
//         const squaresRemoved = squares.splice(i, width)
//         squares = squaresRemoved.concat(squares)
//         squares.forEach(cell => grid.appendChild(cell))
//       }
//     }
//   }

//   //Game Over
//   function gameOver() {
//     if (current.some(index => squares[currentPosition + index].classList.contains('settledBlock'))) {
//       // scoreDisplay.innerHTML = 'end'
//       cancelAnimationFrame(timerId)
//     }
//   }

//   //start the game
//   startBtn.addEventListener('click', () => {
//     if (timerId) {
//       cancelAnimationFrame(timerId)
//       timerId = null
//     } else {
//       draw()
//       timerId = requestAnimationFrame(moveDown)
//       nextRandom = Math.floor(Math.random() * theTetrominoes.length)
//       displayShape()
//     }
//   })

//   // adds an event listener to the document that listens for key presses
//   document.addEventListener("keyup", function (e) {
//     // if desired key pressed, pause 
//     // Replace Escape with the key you want to execute the pause function
//     if (e.key === 32) {
//       pause();
//       // else do nothing
//     } else {

//     }
//   });

//   // let secondsPassed;
//   // let oldTimeStamp;
//   // let fps;

//   // function that displays fps of performance
//   // function displayFPS() {
//   //   const newTimeStamp = performance.now();
//   //   const delta = newTimeStamp - oldTimeStamp;
//   //   oldTimeStamp = newTimeStamp;
//   //   fps = 1000 / delta;
//   //   fpsDisplay.innerHTML = fps.toFixed(2);
//   //   }

//   //   displayFPS()

//   // const times = [];
//   // let fps;

//   // function refreshLoop() {
//   //   window.requestAnimationFrame(() => {
//   //     const now = performance.now();
//   //     while (times.length > 0 && times[0] <= now - 1000) {
//   //       times.shift();
//   //     }
//   //     times.push(now);
//   //     fps = times.length;
//   //     refreshLoop();
//   //   });
//   // }

//   // refreshLoop();

// })