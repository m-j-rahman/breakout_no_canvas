document.addEventListener('DOMContentLoaded', () => {
    const gridWidth = 10
    const gridHeight = 20
    const gridSize = gridWidth * gridHeight
    const finalGrid = createGrid();

    function createGrid() {
        // the main grid
        let grid = document.querySelector(".grid")
        for (let i = 0; i < gridSize; i++) {
            let gridElement = document.createElement("div")
            grid.appendChild(gridElement)
        }

        // set base of grid
        for (let i = 0; i < gridWidth; i++) {
            let gridElement = document.createElement("div")
            gridElement.setAttribute("class", "blockBase")
            grid.appendChild(gridElement)
        }

        let miniGrid = document.querySelector(".mini-grid")
        for (let i = 0; i < 16; i++) {
            let gridElement = document.createElement("div")
            miniGrid.appendChild(gridElement);
        }
        return grid;
    }
});