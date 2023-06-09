var playerRed = "Purple Dragons";
var playerYellow = "Black Ravens";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.
var scoreboardRed = document.querySelector(".scoreboard-red p");
var scoreboardYellow = document.querySelector(".scoreboard-yellow p");
scoreboardYellow.innerText = playerYellow + ": ";
scoreboardRed.innerText = playerRed + ": ";

let victoryCountR = 0;
let victoryCountY = 0;

let playerTurn = document.getElementById("playerturn");
playerTurn.innerText = playerRed + "'s turn";

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            // In HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }

    
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        console.log(playerTurn)
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array


    getTurn();
    checkWinner();
}


function getTurn() {
    
    if (currPlayer == playerRed) {
        playerTurn.innerText = playerRed + "'s turn";
    }
    else {
        playerTurn.innerText = playerYellow + "'s turn";
    }
}



function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        wAudio();
        winner.innerText = playerRed + " wins";
        gameOver = true;
        let victoryCountEl = document.getElementById("victory-count-red");
        victoryCountR++;
        victoryCountEl.innerText = victoryCountR;
    } else {
        wAudio();
        winner.innerText = playerYellow + " wins";
        gameOver = true;
        let victoryCountEl = document.getElementById("victory-count-yellow");
        victoryCountY++;
        victoryCountEl.innerText = victoryCountY;
    }
}


function wAudio() {
  var audio = new Audio("../assets/wAudio.mp3"); // added ".mp3" extension and updated variable name
  audio.play(); // added play method
}

function restartGame(){
    document.getElementsByClassName("restart-btn")[0].addEventListener("click", function() {
    let removeTile=document.querySelectorAll(".tile");
    removeTile.forEach(removeTile => removeTile.remove()) 
    gameOver = false;
    setGame();
    document.getElementById("winner").innerText = "";
  });
}
restartGame();

