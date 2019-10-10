const { bot } = require('./src');

exports.handler = async (event) => {

  console.log('event: ', event);

  try {
    // parse the body for lambda-proxy-integration. No need to parse for unit tests
    const body = JSON.parse(event.body);
    const res = await bot(body);
    const response = {
      statusCode: res.status,
      body: JSON.stringify(''),
    };
    return response;
  } catch (e) {
    console.error('HANDLER ERROR: ', e);
  }
};