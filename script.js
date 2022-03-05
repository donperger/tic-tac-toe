const gameBoard = (() => {
    let gridArray = ["", "", "", 
                    "", "", "", 
                    "", "", ""];

    function checkFields() {
        if (gridArray[0] && gridArray[0] === gridArray[4] && gridArray[4] === gridArray [8]) {
            console.log(`${gridArray[0]} has won`);
            return
        }

        if (gridArray[2] && gridArray[2] === gridArray [4] && gridArray[4] === gridArray[6]) {
            console.log(`${gridArray[2]} has won`);
            return
        }

        for (let i = 0; i < 3; i++) {
            if(gridArray[i] && gridArray[i] === gridArray[i + 3] && gridArray[i + 3] === gridArray[i + 6]) {
                console.log(`${gridArray[i]} has won`);
                return
            }
        }

        for (let i = 0; i <= 6; i += 3) {
            if (gridArray[i] && gridArray[i] === gridArray[i + 1] && gridArray[i+1] === gridArray[i+2]) {
                console.log(`${gridArray[i]} has won`);
                return
            }
        }

        const isGameBoardFull = gridArray.every((item) => Boolean(item) === true)

        if (isGameBoardFull === true) {
            console.log("It's a tie!")
        }      
    }

    return {gridArray, checkFields}
})();

const displayController = (() => {
    let mark = "X"

    function displayScores(scoreP1, scoreP2) {
        const player1ScoreDiv = document.querySelector(".player1-score");
        const player2ScoreDiv = document.querySelector(".player2-score");

        player1ScoreDiv.textContent = scoreP1;
        player2ScoreDiv.textContent = scoreP2;
    }

    function initializeListeners () {
        const gameBoardFields = document.querySelectorAll(".field");
        
        gameBoardFields.forEach(field => {
        field.addEventListener("click", () => addText(field))
        })
    }

    function addText (field) {
        if (!field.innerText) {
            field.innerText = mark;

            const fieldId = field.id.split("-")[1];
            gameBoard.gridArray[fieldId] = mark;

            gameBoard.checkFields();

            mark = mark === "X" ? "O" : "X";
        }
    }
        const gameBoardDiv = document.querySelector(".game-board");

    function createGridCell(item, index) {
        const xoContainer = document.createElement("div");
        xoContainer.setAttribute("id",`filed-${index}`);
        xoContainer.classList.add("field");
        xoContainer.textContent = item;

        gameBoardDiv.appendChild(xoContainer);
    }

    function displayContent (array) {
        array.forEach((item, index) => {
            createGridCell(item, index)
        })
    }

    return {initializeListeners, displayContent, displayScores}

})();

const player = (name, mark) => {
    let score = 0;

    return {name, score, mark}
}


const player1 = player("p1", "X");
const player2 = player("p2", "O");

displayController.displayScores(player1.score, player2.score);
displayController.displayContent( gameBoard.gridArray);
displayController.initializeListeners();