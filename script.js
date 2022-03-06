const player = (name, mark) => {
    let score = 0;

    return {name, score, mark}
}

const formController = (() => {
    let player1Name = "Player1";
    let player2Name = "Player2";
    const form = document.querySelector(".name-form")
    const player1NameInput = document.querySelector("#player1_name");
    const player2NameInput = document.querySelector("#player2_name")
    const startButton = document.querySelector(".start");

    startButton.addEventListener("click", startGame);

    function startGame() {
        if (player1NameInput.value) player1Name = player1NameInput.value;
        if (player1NameInput.value) player2Name = player2NameInput.value;
        

        player1NameInput.value = "";
        player2NameInput.value = "";

        player1.name = player1Name;
        player2.name = player2Name;

        displayController.displayMove();

        form.style.display = "none";
        gameBoard.enableFields();
    }

    function displayForm () {
        form.style.display = "grid";
    }

    return {displayForm}
})();

const gameBoard = (() => {
    let gridArray = ["", "", "", 
                    "", "", "", 
                    "", "", ""];

    const playAgainButton = document.querySelector(".again");
    playAgainButton.addEventListener("click", playAgain);

    const restartButton = document.querySelector(".res");
    restartButton.addEventListener("click", restart);

    function initializeListeners () {
        const gameBoardFields = document.querySelectorAll(".field");
        
        gameBoardFields.forEach(field => {
        field.addEventListener("click", () => displayController.addText(field))
        })
    }

    function addMarkToArray(mark, id) {
        gridArray[id] = mark;
    }

    function checkFields() {
        if (gridArray[0] && gridArray[0] === gridArray[4] && gridArray[4] === gridArray [8]) {
            addPoint(gridArray[0]);
            disableFields();
            displayController.congratulate(gridArray[0])
            return;
        }

        if (gridArray[2] && gridArray[2] === gridArray [4] && gridArray[4] === gridArray[6]) {
            addPoint(gridArray[2]);
            disableFields();
            displayController.congratulate(gridArray[2]);
            return;
        }

        for (let i = 0; i < 3; i++) {
            if(gridArray[i] && gridArray[i] === gridArray[i + 3] && gridArray[i + 3] === gridArray[i + 6]) {
                addPoint(gridArray[i]);
                disableFields();
                displayController.congratulate(gridArray[i]);
                return;
            }
        }

        for (let i = 0; i <= 6; i += 3) {
            if (gridArray[i] && gridArray[i] === gridArray[i + 1] && gridArray[i+1] === gridArray[i+2]) {
                addPoint(gridArray[i]);
                disableFields();
                displayController.congratulate(gridArray[i]);
                return;
            }
        }

        const isGameBoardFull = gridArray.every((item) => Boolean(item) === true)

        if (isGameBoardFull === true) {
            displayController.congratulate("tie");
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

        fieldDivs.forEach(field => field.style.pointerEvents = "none");
    }

    function enableFields() {
        const fieldDivs = document.querySelectorAll(".field");

        fieldDivs.forEach(field => field.style.pointerEvents = "auto");  
    }

    function playAgain() {
        displayController.vanishAnnouncer();

        displayController.emptyFields();

        emptyGridArray();
    }

    function emptyGridArray () {
        gridArray = gridArray.map(item => item = "");
    }

    function restart() {
        displayController.vanishAnnouncer();

        player1.score = 0;
        player2.score = 0;
        displayController.displayScores(player1.score, player2.score);

        emptyGridArray();
        displayController.emptyFields();

        formController.displayForm();
    }

    return {gridArray, initializeListeners, addMarkToArray, checkFields, enableFields}
})();

const displayController = (() => {
    const gameBoardDiv = document.querySelector(".game-board");
    const roundLabel = document.querySelector(".round-label");
    const announcer = document.querySelector(".announcer");
    let mark = "X";

    function displayScores(scoreP1, scoreP2) {
        const player1ScoreDiv = document.querySelector(".player1-score");
        const player2ScoreDiv = document.querySelector(".player2-score");

        player1ScoreDiv.textContent = scoreP1;
        player2ScoreDiv.textContent = scoreP2;
    }

    function addText (field) {
        if (!field.innerText) {
            field.innerText = mark;

            const fieldId = field.id.split("-")[1];
            gameBoard.addMarkToArray(mark, fieldId);

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
            roundLabel.textContent = `It's ${player1.name}'s (X) turn.`
        } else {
            roundLabel.textContent = `It's ${player2.name}'s (O) turn.`
        }
    }

    function emptyFields () {
        const fieldDivs = document.querySelectorAll(".field");

        fieldDivs.forEach(field => {
            field.style.pointerEvents = "auto";
            field.textContent = "";
        });
    }

    function congratulate(mark) {
        if (mark === "X") {
            var cong = `The winner is: ${player1.name}`;
        } else if (mark === "X") {
            var cong = `The winner is: ${player2.name}`;
        } else {
            var cong = "It is a TIE!"
        }

        announcer.textContent = cong;
        announcer.style.display = "block";
    }

    function vanishAnnouncer () {
        announcer.style.display = "none";
    }
 
    return {displayContent, displayScores, addText, emptyFields, congratulate, vanishAnnouncer, displayMove}

})();

const player1 = player("p1", "X");
const player2 = player("p2", "O");

displayController.displayScores(player1.score, player2.score);
displayController.displayContent( gameBoard.gridArray);
gameBoard.initializeListeners();