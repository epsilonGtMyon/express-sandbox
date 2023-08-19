const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { client } = require("./client.js");

const docClient = DynamoDBDocumentClient.from(client);

module.exports.client = client;
module.exports.docClient = docClient;
