const cells = document.querySelectorAll(".cell");
const resultDisplay = document.querySelector("#result");
const restartButton = document.querySelector("#restart");

function renderBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = Number(cell.dataset.index);
    playTurn(index);
    renderBoard();
  });
});

let gameOver = false;

const gameBoard = ["", "", "", "", "", "", "", "", ""];

function placeMark(index, mark) {
  if (gameBoard[index] !== "") return false;
  gameBoard[index] = mark;
  return true;
}

let currentPlayer = "X";

function switchPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function playTurn(index) {
  if (gameOver) return;

  const placed = placeMark(index, currentPlayer);
  if (!placed) return;

  const winner = checkWinner();

  if (winner) {
    resultDisplay.textContent = winner + " wins!";
    gameOver = true;
    return;
  }

  const tie = checkTie();

  if (tie) {
    resultDisplay.textContent = "It's a tie!";
    gameOver = true;
    return;
  }

  switchPlayer();
}

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let pattern of winningPatterns) {
    const a = pattern[0];
    const b = pattern[1];
    const c = pattern[2];

    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }
  return null;
}

function checkTie() {
  return gameBoard.every((cell) => cell !== "");
}

function restartGame() {
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i] = "";
  }

  currentPlayer = "X";
  gameOver = false;
  resultDisplay.textContent = "";

  renderBoard();
}

restartButton.addEventListener("click", restartGame);

renderBoard();
