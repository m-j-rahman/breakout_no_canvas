
// document.addEventListener('DOMContentLoaded', () => {

//     const shapes = new Array();
//     const gridWidth = 10
//     const gridHeight = 20
//     const gridSize = gridWidth * gridHeight
//     var colors = ['black', 'orange', 'red', 'blue'];
//     createBoard()

//     function createGrid() {
//         // the main grid
//         let grid = document.querySelector(".grid")
//         for (let i = 0; i < gridSize; i++) {
//             let gridElement = document.createElement("div")
//             grid.appendChild(gridElement)
//         }

//         // set base of grid
//         for (let i = 0; i < gridWidth; i++) {
//             let gridElement = document.createElement("div")
//             gridElement.setAttribute("class", "blockBase")
//             grid.appendChild(gridElement)
//         }

//         let miniGrid = document.querySelector(".mini-grid")
//         for (let i = 0; i < 16; i++) {
//             let gridElement = document.createElement("div")
//             miniGrid.appendChild(gridElement);
//         }
//         return grid;
// }

//     function createShapes(){

//     var Tblock = [[1, 0], [0,1], [1,1],[2,1]]; // 't' shape
//     var Iblock = [[0, 0], [0, 1], [0, 2], [0, 3]]; // line
//     var Squareblock = [[0, 0], [0, 1], [1, 0], [1, 1]]; // 4 x 4 square
//     var Lblock = [[2,0], [0, 1], [1, 1], [2,1]]; // 'L' shape
    
//     shapes.push(Tblock);
//     shapes.push(Iblock);
//     shapes.push(Squareblock);
//     shapes.push(Lblock);
// }


// function createIndividualShape(){
//     var randomShape = Math.floor(Math.random() * shapes.length);
//     var randomColor = Math.floor(Math.random() * colors.length);
//     var center = Math.floor(gridWidth / 2);
//     var shape = shapes[randomShape];
//     var location = center 

//     currentShape = {
//         shape: shape,
//         color: colors[randomColor],
//         location: location,
//         indexes: getBlockNumbers(shape, location)
//     };
// }

// });

