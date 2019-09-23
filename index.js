const request = require('superagent');
const rollDice = require('./roller');

exports.handler = async (event) => {
  // TODO implement

  console.log('event: ', event);

  const roll = rollDice('4d6-L');
  console.log('ROLL: ', roll);

  
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};

const postRoll = async (roll) => {
try {

  const res = await request.post('https://api.groupme.com/v3/bots/post').send(process.env.BOT_ID);
  console.log('SUCCESS: ', res);
  
} catch (e) {
  console.error(e);
  throw e;
}
}