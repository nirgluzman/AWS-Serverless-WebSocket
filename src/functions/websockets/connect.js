const Responses = require('../common/API_Responses');
const DynamoDB = require('../common/DynamoDB');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);

  const { connectionId: connectionID } = event.requestContext;

  const data = {
    ID: connectionID,
    date: new Date().toISOString(),
    messages: [],
  };

  try {
    await DynamoDB.write(tableName, data);
    return Responses._200({ message: 'connected' });
  } catch (err) {
    console.log('DynamoDB error', err);
    return Responses._500({ message: err.message });
  }
};
