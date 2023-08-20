require("dotenv").config();

const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../../common/docClient.js")


async function example1() {
  const command = new QueryCommand({
    TableName: "score",
    KeyConditionExpression: "student = :student",
    FilterExpression: "score_value >= :score_value",
    ExpressionAttributeValues: {
      ":student": "Ichiro",
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
