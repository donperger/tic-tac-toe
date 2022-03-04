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

    function initializeListeners () {
        const gameBoardFields = document.querySelectorAll(".field");
        
        gameBoardFields.forEach(field => {
        field.addEventListener("click", () => addText(field))
        })
    }

    function addText (field) {
        field.innerText = mark;
        mark = mark === "X" ? "O" : "X";
    }
    
    return {initializeListeners}

})();

const player = (name) => {
    const playeName = name;
    let score = 0;

    return {name, score}
}


const player1 = player("p1");
const player2 = player("p2");
console.log(player1.name, player1.score);
console.log(player2.name, player2.score);

gameBoard.displayContent();
displayController.initializeListeners();