const bot = require('./bot');

exports.handler = async (event) => {

  console.log('event: ', event);

  try {
    const res =await bot(event);
    const response = {
      statusCode: res.status,
      body: JSON.stringify(''),
    };
    return response;
  } catch (e) {
    console.error('HANDLER ERROR: ', e);
  }
};