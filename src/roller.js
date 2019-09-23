const { DiceRoller } = require('rpg-dice-roller');

const rollDice = dice => {
  const diceRoller = new DiceRoller();
  diceRoller.roll(dice)

  const latestRoll = diceRoller.log.shift();
  return latestRoll.toString();
}

module.exports = rollDice;