const request = require('superagent');
const rollDice = require('./roller');

const postRoll = async (response) => {
  try {
    const params = {
      "bot_id": process.env.BOT_ID,
      "attachments": response.attachments,
      "text": response.text
    }
  
    const res = await request.post('https://api.groupme.com/v3/bots/post').send(params);
    return res;
    
  } catch (e) {
    console.error(e);
    throw e;
  }
}

const processCommand = (command) => {
  const stats = /stats/.test(command[1]);

  if (stats) {
    return [
      rollDice('4d6-L'),
      rollDice('4d6-L'),
      rollDice('4d6-L'),
      rollDice('4d6-L'),
      rollDice('4d6-L'),
      rollDice('4d6-L')
    ].toString();
  } else {
    return rollDice(command[1]);
  }
  
}

const processMessage = (body) => {
  const rollBot = /@roll/i.test(body.text)
  
  if (rollBot) {
    const commandMatch = /@roll\s*(\S+)/;
    const command = commandMatch.exec(body.text);
    return command;
  }
};

const bot = async (body) => {
  const command = processMessage(body);

  if (command) {
    try {
      const userRoll = processCommand(command);
      const response = {
        attachments: [{
          'type': 'mentions',
          'user_ids': [body.sender_id]
        }],
        text: userRoll
      };
      console.log('response is: ', response);
      const res = await postRoll(response);
      console.log('res is: ', res);
      return res;
    } catch (error) {
      console.error(e);
      throw e;
    }
  }
};

module.exports = {
  postRoll,
  processMessage,
  processCommand,
  bot
};