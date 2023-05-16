const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const DynamoDB = {
  // https://dynobase.dev/dynamodb-nodejs/#scan
  scan(TableName) {
    const params = {
      TableName,
    };
    return ddb.scan(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#get-item
  get(TableName, ID) {
    const params = {
      TableName,
      Key: { ID },
    };
    return ddb.get(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#put-item
  // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_PutItem_section.html
  write(TableName, data) {
    const params = {
      TableName,
      Item: data,
    };
    return ddb.put(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#delete-item
  delete(TableName, ID) {
    const params = {
      TableName,
      Key: { ID },
      ReturnValues: 'ALL_OLD',
    };
    return ddb.delete(params).promise();
  },
};

module.exports = DynamoDB;
