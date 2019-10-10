const request = require('superagent');
const rollDice = require('./roller');

const postRoll = async (response) => {
  try {
    const params = {
      bot_id: process.env.BOT_ID,
      attachments: response.attachments,
      text: response.text
    }
  
    console.log('message attachments are: ', response.attachments);
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
      '\n' + rollDice('4d6-L'),
      '\n' + rollDice('4d6-L'),
      '\n' + rollDice('4d6-L'),
      '\n' + rollDice('4d6-L'),
      '\n' + rollDice('4d6-L')
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
  const tagName = `@${body.name}`;
  const nameLoci = tagName.length;
  console.log('nameLoci length: ', nameLoci);

  if (command) {
    try {
      const userRoll = processCommand(command);
      const response = {
        attachments: [{
          type: 'mentions',
          loci: [[0,nameLoci]],
          user_ids: [body.user_id]
        }],
        text: `${tagName} ${userRoll}`
      };
      
      const res = await postRoll(response);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = {
  postRoll,
  processMessage,
  processCommand,
  bot
};