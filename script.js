const gameBoard = (() => {
    let gridArray = ["X", "O", "X", 
                    "X", "X", "O", 
                    "O", "O", "X"];
    
    const gameBoardDiv = document.querySelector(".game-board");

    function createGridCell(item) {
        const xoContainer = document.createElement("div");
        xoContainer.textContent = item;

        gameBoardDiv.appendChild(xoContainer);
    }

    function displayContent () {
        gridArray.forEach(createGridCell)
    }

    return {displayContent};
})();

const Player = (name) => {
    const playeName = name;
    let score = 0;
}

gameBoard.displayContent();