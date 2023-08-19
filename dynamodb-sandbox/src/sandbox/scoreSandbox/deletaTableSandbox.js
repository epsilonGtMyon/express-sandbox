require("dotenv").config();

const { DeleteTableCommand } = require("@aws-sdk/client-dynamodb");
const { client } = require("../../common/docClient.js");

async function main() {
  const command = new DeleteTableCommand({
    TableName: "score",
  });

  const response = await client.send(command);
  console.log(response);
}
main();
