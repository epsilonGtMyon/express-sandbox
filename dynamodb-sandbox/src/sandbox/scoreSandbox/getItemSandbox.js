require("dotenv").config();

const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../../common/docClient.js");

async function main() {
  const command = new GetCommand({
    TableName: "score",
    Key: {
      student: "Taro",
      subject: "Math",
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
}

main();
