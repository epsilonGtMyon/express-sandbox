require("dotenv").config();

const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { client } = require("../../common/docClient.js");

async function main() {
  const command = new CreateTableCommand({
    TableName: "score",
    AttributeDefinitions: [
      {
        AttributeName: "student",
        AttributeType: "S",
      },
      {
        AttributeName: "subject",
        AttributeType: "S",
      },
      {
        AttributeName: "score_value",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "student",
        KeyType: "HASH",
      },
      {
        AttributeName: "subject",
        KeyType: "RANGE",
      },
    ],
    LocalSecondaryIndexes: [
      {
        IndexName: "student_score",
        KeySchema: [
          {
            AttributeName: "student",
            KeyType: "HASH",
          },
          {
            AttributeName: "score_value",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "KEYS_ONLY"
        }
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  const response = await client.send(command);
  console.log(response);
}
main();
