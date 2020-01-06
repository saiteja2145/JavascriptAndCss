const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let hasBonusLife = true;

let battleLog = [];
const maxLifeValue = () => {
  const enteredValue = +prompt('Maximum life for you and the monster', 100);
  if (isNaN(enteredValue) || enteredValue <= 0) {
    throw { message: 'Invalid user input' };
  }
  return enteredValue;
};
let chosenMaxLife;
try {
  chosenMaxLife = maxLifeValue();
} catch (err) {
  console.log(err.message);
  chosenMaxLife = 100;
}
let currentMonsterHelth = chosenMaxLife;
let currentPlayerHelth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);

const endRound = () => {
  const initialPlayerHelth = currentPlayerHelth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHelth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHelth,
    currentPlayerHelth
  );
  if (currentPlayerHelth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHelth = initialPlayerHelth;
    alert('You would be dead but the bonus life saved you');
    setPlayerHealth(initialPlayerHelth);
  }
  if (currentMonsterHelth <= 0 && currentPlayerHelth > 0) {
    alert('You Won');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Player Won',
      currentMonsterHelth,
      currentPlayerHelth
    );
    reset();
  } else if (currentPlayerHelth <= 0 && currentMonsterHelth > 0) {
    alert('You Lost');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Monster Won',
      currentMonsterHelth,
      currentPlayerHelth
    );
    reset();
  } else if (currentPlayerHelth <= 0 && currentMonsterHelth <= 0) {
    alert('You have a draw');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Draw',
      currentMonsterHelth,
      currentPlayerHelth
    );
    reset();
  }
};

const writeToLog = (event, value, monsterHealth, playerHealth) => {
  let logEntry = {
    event,
    value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  battleLog.push(logEntry);
};

const reset = () => {
  currentMonsterHelth = chosenMaxLife;
  currentPlayerHelth = chosenMaxLife;
  resetGame(chosenMaxLife);
};

const attackMonster = mode => {
  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHelth -= damage;
  writeToLog(logEvent, damage, currentMonsterHelth, currentPlayerHelth);
  endRound();
};

const attackHandler = () => {
  attackMonster(MODE_ATTACK);
};

const strongAttackHandler = () => {
  attackMonster(MODE_STRONG_ATTACK);
};

const healPlayerHandler = () => {
  let healValue;
  if (currentPlayerHelth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't Heal more than MAX initial helth");
    healValue = chosenMaxLife - currentPlayerHelth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHelth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHelth,
    currentPlayerHelth
  );
  endRound();
};

const printLoghandler = () => {
  let i = 0;
  for (const log of battleLog) {
    console.log(`#${i}`);
    for (const key in log) {
      console.log(`${key} and ${log[key]}`);
    }
    i++;
  }
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLoghandler);
