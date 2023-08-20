require("dotenv").config();

const { BatchGetCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../../common/docClient.js");

async function main() {
  const command = new BatchGetCommand({
    RequestItems: {
      score: {
        Keys: [
          {
            student: "Taro",
            subject: "Math",
          },
          {
            student: "Ichiro",
            subject: "Science",
          },
        ],
        //ProjectionExpression: "student, subject"
      }
    }
  });

  const response = await docClient.send(command);
  console.dir(response.Responses.score)
  return response;
}

main();
