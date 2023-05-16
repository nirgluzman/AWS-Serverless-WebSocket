const Responses = require('../common/API_Responses');
const DynamoDB = require('../common/DynamoDB');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);

  const { connectionId: connectionID } = event.requestContext;

  try {
    await DynamoDB.delete(tableName, connectionID);
    return Responses._200({ message: 'disconnected' });
  } catch (err) {
    console.log('DynamoDB error', err);
    return Responses._500({ message: err.message });
  }
};
