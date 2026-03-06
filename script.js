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
  const placed = placeMark(index, currentPlayer);
  if (!placed) return;

  const winner = checkWinner();

  if (winner) {
    console.log(winner + "wins!");
    return;
  }
  switchPlayer();
  console.log(gameBoard);
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
