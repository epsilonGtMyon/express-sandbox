require("dotenv").config();

const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../../common/docClient.js")


async function example1() {
  const command = new ScanCommand({
    TableName: "score",
    FilterExpression: "score_value >= :score_value",
    ExpressionAttributeValues: {
      ":score_value": 70
    }
  });

  const response = await docClient.send(command);
  //console.log(response);
  console.log(response.Items);
}

async function main() {
  await example1()
}

main();
