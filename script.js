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
    let mark = "X";

    function initializeListeners () {
        const gameBoardFields = document.querySelectorAll(".field");
        
        gameBoardFields.forEach(field => {
        field.addEventListener("click", () => addText(field))
        })
    }

    function addText (field) {
        if (!field.innerText) {
            field.innerText = mark;
        }
        
        mark = mark === "X" ? "O" : "X";
    }
    
    return {initializeListeners}

})();

const player = (name, mark) => {
    let score = 0;

    return {name, score, mark}
}


const player1 = player("p1", "X");
const player2 = player("p2", "O");
console.log(player1);
console.log(player2);

gameBoard.displayContent();
displayController.initializeListeners();