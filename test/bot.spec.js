const rollDice = require('../roller');
const {
  postRoll,
  processMessage,
  processCommand,
  bot
} = require('../bot');


describe('Testing the dice roller bot', function() {
  it('should roll the dice', async function() {
    try {
      const roll = await rollDice('4d6-L');
      // assert.isString(rollDice, 'lets roll');
      console.log('roll: ', roll)
    } catch (e) {
      console.error(e);
    }
  });

  it('should accept dice roll notation', function() {
    const command = ['@roll', '1d20'];

    const roll = processCommand(command);
    console.log('test roll! ', roll)
  });

  it('should process the stats command', function() {
    const command = ['@roll', 'stats'];

    const roll = processCommand(command);
    console.log('test stats! ', roll);
  });

  it('should process a message', async function() {
    try {
      const message = {
        "attachments": [],
        "avatar_url": "https://i.groupme.com/123456789",
        "created_at": 1302623328,
        "group_id": "53857750",
        "id": "1234567890",
        "name": "nick",
        "sender_id": "12345",
        "sender_type": "user",
        "source_guid": "GUID",
        "system": false,
        "text": "@roll 1d20",
        "user_id": "1234567890"
      }

      await processMessage(message);

    } catch (e) {
      console.error(e);
    }
  });

  it('should run the full bot', async function() {
    const message = {
      "attachments": [],
      "avatar_url": "https://i.groupme.com/123456789",
      "created_at": 1302623328,
      "group_id": "53857750",
      "id": "1234567890",
      "name": "nick",
      "sender_id": "12345",
      "sender_type": "user",
      "source_guid": "GUID",
      "system": false,
      "text": "@roll stats",
      "user_id": "1234567890"
    };

    try {
      const response = await bot(message);
      console.log('bot response! ', response.status);
    } catch (e) {
      console.error(e);
    }
  })

  
})