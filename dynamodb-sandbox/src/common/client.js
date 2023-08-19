const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const client = process.env.ENDPOINT_URL
  ? new DynamoDBClient({ endpoint: process.env.ENDPOINT_URL })
  : new DynamoDBClient();

module.exports.client = client;
