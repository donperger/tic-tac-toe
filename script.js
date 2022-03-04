const gameBoard = (() => {
    let gridArray = ["", "", "", 
                    "", "", "", 
                    "", "", ""];
    
    const gameBoardDiv = document.querySelector(".game-board");

    function createGridCell(item, index) {
        const xoContainer = document.createElement("div");
        xoContainer.setAttribute("id",`filed-${index}`);
        xoContainer.classList.add("field");
        xoContainer.textContent = item;

        gameBoardDiv.appendChild(xoContainer);
    }

    function displayContent () {
        gridArray.forEach((item, index) => {
            createGridCell(item, index)
        })
    }

    return {displayContent};
})();

const displayController = (() => {
    let mark = "X"

    function initalizeListeners () {
        const gameBoardFields = document.querySelectorAll(".field");
        
        gameBoardFields.forEach(field => {
        field.addEventListener("click", () => addText(field))
        })
    }

    function addText (field) {
        field.innerText = mark;
        mark = mark === "X" ? "O" : "X";
    }
    
    return {initalizeListeners}

})();

const Player = (name) => {
    const playeName = name;
    let score = 0;
}

gameBoard.displayContent();
displayController.initalizeListeners();