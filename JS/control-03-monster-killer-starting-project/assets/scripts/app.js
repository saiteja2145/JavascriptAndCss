const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let hasBonusLife = true;
let chosenMaxLife = 100;
let currentMonsterHelth = chosenMaxLife;
let currentPlayerHelth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);

const endRound = () => {
  const initialPlayerHelth = currentPlayerHelth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHelth -= playerDamage;
  if (currentPlayerHelth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHelth = initialPlayerHelth;
    alert('You would be dead but the bonus life saved you');
    setPlayerHealth(initialPlayerHelth);
  }
  if (currentMonsterHelth <= 0 && currentPlayerHelth > 0) {
    alert('You Won');
    reset();
  } else if (currentPlayerHelth <= 0 && currentMonsterHelth > 0) {
    alert('You Lost');
    reset();
  } else if (currentPlayerHelth <= 0 && currentMonsterHelth <= 0) {
    alert('You have a draw');
    reset();
  }
};

const reset = () => {
  currentMonsterHelth = chosenMaxLife;
  currentPlayerHelth = chosenMaxLife;
  resetGame(chosenMaxLife);
};

const attackMonster = mode => {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHelth -= damage;
  endRound();
};

const attackHandler = () => {
  attackMonster('ATTACK');
};

const strongAttackHandler = () => {
  attackMonster('STRONG_ATTACK');
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
  endRound();
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
