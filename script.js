const player = (name, mark) => {
    let score = 0;

    return {name, score, mark}
}

const formController = (() => {
    const form = document.querySelector(".name-form")
    const player1NameInput = document.querySelector("#player1_name");
    const player2NameInput = document.querySelector("#player2_name")
    const startButton = document.querySelector(".start");
    const aiDropdown = document.querySelector("#ai");
    const player2Label = document.querySelector(".player2-label");

    aiDropdown.addEventListener("change", () => {
        if (aiDropdown.value === "player") {
            _enablePlayer2();
        } else {
            _disablePlayer2();
        };
    })

    startButton.addEventListener("click", startGame);

    function startGame() {
        if (player1NameInput.value) player1.name = player1NameInput.value;
        if (player2NameInput.value) {
            player2.name = player2NameInput.value;
        } else if (aiDropdown.value === "random" || aiDropdown.value === "unbeatable") {
            player2.name = "AI";
        }

        player1NameInput.value = "";
        player2NameInput.value = "";

        displayController.displayMove();

        form.style.display = "none";
        gameBoard.enableFields();
    }

    function displayForm () {
        form.style.display = "grid";
    }

    function _disablePlayer2() {
        player2Label.style.textDecoration = "line-through";
        player2NameInput.disabled = true;
    }

    function _enablePlayer2 ()  {
        player2Label.style.textDecoration = "none";
        player2NameInput.disabled = false;
        player2.name = "p2";
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
        field.addEventListener("click", () => {
            displayController.addText(field);
            
            if (player2.name === "AI") {
                const isGameBoardFull = _chekFullGameBoard();
                
                if ( isGameBoardFull === false) {
                   const aiFieldId = ai.aiMove(gridArray);
            
                    gridArray[aiFieldId] = "O"; 
                    displayController.addAiMove(aiFieldId);
                }    
            }
            let check = checkFields(gridArray);
            if (check[0] === true || check[1] === "tie") {
                addPoint(check[1]);
                disableFields();
                displayController.congratulate(check[1]);
            }
        })
        })
    }

    function addMarkToArray(mark, id) {
        gridArray[id] = mark;
    }

    function checkFields(board) {
        if (board[0] && board[0] === board[4] && board[4] === board [8]) {
            return [true, board[0]];
        }

        if (board[2] && board[2] === board [4] && board[4] === board[6]) {
            return [true, board[2]];
        }

        for (let i = 0; i < 3; i++) {
            if(board[i] && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
                return [true, board[i]];
            }
        }

        for (let i = 0; i <= 6; i += 3) {
            if (board[i] && board[i] === board[i + 1] && board[i+1] === board[i+2]) {
                return [true, board[i]];
            }
        }

        const isGameBoardFull = _chekFullGameBoard();

        if (isGameBoardFull === true) {
            return [false, "tie"];
        }
        
        return [false, undefined];
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

    function _chekFullGameBoard () {
        return gridArray.every((item) => Boolean(item) === true)
    }

    return {gridArray, initializeListeners, addMarkToArray, enableFields, checkFields}
})();

const ai = (() => {
    function aiMove(gridArray) {
        
        let randomFieldNumber = Math.floor(Math.random()*gridArray.length);

        while (gridArray[randomFieldNumber]) {
            randomFieldNumber = Math.floor(Math.random()*gridArray.length);
        }

        return randomFieldNumber;
        
    };

    function getEmptyFieldsIndex(board) {
        let indexedBoard = board.map((elem, index) => {
            if (elem) return elem;
            else return index;
        })

        return indexedBoard.filter(elem => elem !== "X" && elem !== "O")
    }

    function minimax(newBoard, player) {
        var availableFields = getEmptyFieldsIndex(newBoard);
        console.log(availableFields);

        if (gameBoard.checkFields(newBoard)[0]) {
            if (gameBoard.checkFields(newBoard)[1] === "X") {
                return {score: -10}
            } else if (gameBoard.checkFields(newBoard)[1] === "O") {
                return {score: 10}
            } else if (availableFields.length === 0) {
                return {score: 0}
            }
        }

        var moves = [];

        for (var i = 0; i < availableFields.length; i++) {

            var move = {};
            move.index = availableFields[i];
            newBoard[availableFields[i]] = player;

            if (player === "O") {
                var result = minimax(newBoard, "X");
                move.score = result.score;
            } else {
                var result = minimax(newBoard, "O");
                move.score = result.score;
            }

            availableFields[i] = move.index;

            moves.push(move);
        }
            

            var bestMove;

            if (player === "O") {
                var bestScore = -10000;
                for ( var i = 0; i < moves.length; i++) {
                    if(moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            } else {
                var bestScore = 10000;
                for(var i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }

            return moves[bestMove];
    }

    return {aiMove, getEmptyFieldsIndex, minimax}
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

            if (player2.name !== "AI") mark = mark === "X" ? "O" : "X";
            
            displayMove();
        }
    }

    function createGridCell(item, index) {
        const xoContainer = document.createElement("div");
        xoContainer.setAttribute("id",`field-${index}`);
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
        if(player2.name === "AI") mark = "X"

        if (mark === "X") {
            roundLabel.textContent = `It's ${player1.name}'s (X) turn.`
        } else {
            roundLabel.textContent = `It's ${player2.name}'s (O) turn.`
        }
    }

    function emptyFields () {
        if (player2.name === "AI") mark = "X";

        const fieldDivs = document.querySelectorAll(".field");

        fieldDivs.forEach(field => {
            field.style.pointerEvents = "auto";
            field.textContent = "";
        });
    }

    function congratulate(mark) {
        if (mark === "X") {
            var cong = `The winner is: ${player1.name}`;
        } else if (mark === "O") {
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

    function addAiMove(aiFieldId) {
        const gridField = document.getElementById(`field-${aiFieldId}`);
        gridField.innerText = "O";
    }
 
    return {displayContent, displayScores, addText, emptyFields, congratulate, vanishAnnouncer, displayMove, addAiMove}

})();

const player1 = player("p1", "X");
const player2 = player("p2", "O");

displayController.displayScores(player1.score, player2.score);
displayController.displayContent( gameBoard.gridArray);
gameBoard.initializeListeners();