const startGameBtn = document.getElementById("start-game-btn");
let gameIsRunning = false;
const ROCK = "ROCK";
const PAPER = "PAPER";
const SICCORS = "SICCORS";
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";
const gameDataArray = [ROCK, PAPER, SICCORS];

const getPlayerChoice = function() {
  const selcetion = prompt(
    `${ROCK} , ${PAPER} or ${SICCORS} ?`,
    ""
  ).toUpperCase();
  if (selcetion !== ROCK && selcetion !== PAPER && selcetion !== SICCORS) {
    alert(`Invalid Choice we chose ${ROCK} for you`);
    return ROCK;
  }
  return selcetion;
};

const getComputerChoice = () => {
  const randomValue = Math.floor(Math.random() * 3);
  return gameDataArray[randomValue];
};

const getWinner = (playerChoice, comChoice) => {
  if (comChoice === playerChoice) {
    return RESULT_DRAW;
  } else if (
    (comChoice === ROCK && playerChoice === PAPER) ||
    (comChoice === PAPER && playerChoice === SICCORS) ||
    (comChoice === SICCORS && playerChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

const startGame = () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game Starting ...");
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  let message = `You picked up ${playerChoice} , computer picked ${computerChoice}, therefore `;
  if (winner === RESULT_DRAW) {
    message += "had a draw";
  } else if (winner === RESULT_PLAYER_WINS) {
    message += "won.";
  } else {
    message += "lost.";
  }
  alert(message);
  gameIsRunning = false;
};

startGameBtn.addEventListener("click", startGame);
