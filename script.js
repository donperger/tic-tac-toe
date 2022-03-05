const gameBoard = (() => {
    let gridArray = ["", "", "", 
                    "", "", "", 
                    "", "", ""];

    const playAgainButton = document.querySelector(".again");
    playAgainButton.addEventListener("click", () => console.log("Play again"));

    const restartButton = document.querySelector(".res");
    restartButton.addEventListener("click", () => console.log("Restart"))

    function checkFields() {
        if (gridArray[0] && gridArray[0] === gridArray[4] && gridArray[4] === gridArray [8]) {
            addPoint(gridArray[0]);
            disableFields();
            return;
        }

        if (gridArray[2] && gridArray[2] === gridArray [4] && gridArray[4] === gridArray[6]) {
            addPoint(gridArray[2]);
            disableFields();
            return;
        }

        for (let i = 0; i < 3; i++) {
            if(gridArray[i] && gridArray[i] === gridArray[i + 3] && gridArray[i + 3] === gridArray[i + 6]) {
                addPoint(gridArray[i]);
                disableFields();
                return;
            }
        }

        for (let i = 0; i <= 6; i += 3) {
            if (gridArray[i] && gridArray[i] === gridArray[i + 1] && gridArray[i+1] === gridArray[i+2]) {
                addPoint(gridArray[i]);
                disableFields();
                return;
            }
        }

        const isGameBoardFull = gridArray.every((item) => Boolean(item) === true)

        if (isGameBoardFull === true) {
            console.log("It's a tie!")
        }      
    }

    function addPoint (mark) {
        if (mark === "X") {
            player1.score += 1;
        } else {
            player2.score += 1;
        }

        displayController.displayScores(player1.score, player2.score);
    }

    function disableFields() {
        const fieldDivs = document.querySelectorAll(".field");

        fieldDivs.forEach(div => div.style.pointerEvents = "none");
    }

    return {gridArray, checkFields}
})();

const displayController = (() => {
    const gameBoardDiv = document.querySelector(".game-board");
    const roundLabel = document.querySelector(".round-label");
    let mark = "X";

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

            displayMove();
        }
    }

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

        displayMove();
    }

    function displayMove () {
        if (mark === "X") {
            roundLabel.textContent = "It's Player 1's turn."
        } else {
            roundLabel.textContent = "It's Player 2's turn."
        }
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