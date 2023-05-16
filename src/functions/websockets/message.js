const Responses = require('../common/API_Responses');
const DynamoDB = require('../common/DynamoDB');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);

  const { connectionId: connectionID } = event.requestContext;

  const body = JSON.parse(event.body);

  try {
    const record = await DynamoDB.get(tableName, connectionID);

    if (JSON.stringify(record) === '{}') {
      return Responses._400({ message: 'failed to get data by ID' });
    }

    const messages = record.Item.messages;

    messages.push(body.message);

    const data = {
      ...record.Item,
      messages,
    };

    await DynamoDB.write(tableName, data);

    return Responses._200({ message: 'got a message' });
  } catch (err) {
    console.log('DynamoDB error', err);
    return Responses._500({ message: err.message });
  }
};
