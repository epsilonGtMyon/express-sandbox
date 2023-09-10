require("dotenv").config();

const {
  CreateTableCommand,
  UpdateTimeToLiveCommand,
} = require("@aws-sdk/client-dynamodb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { client, docClient } = require("../../common/docClient.js");

async function createLogSandbox01Table() {
  const command = new CreateTableCommand({
    TableName: "logSandbox",
    AttributeDefinitions: [
      {
        AttributeName: "category",
        AttributeType: "S",
      },
      // 時刻にしちゃうとダブっちゃうので連番で
      {
        AttributeName: "seq",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "category",
        KeyType: "HASH",
      },
      {
        AttributeName: "seq",
        KeyType: "RANGE",
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

/*
 * TTL対象の属性を設定
 * 対象の時刻が過ぎた時に自動でレコードが消えるようにできる。
 * その属性を指定している。
 */
async function updateTTL() {
  const command = new UpdateTimeToLiveCommand({
    TableName: "logSandbox",
    TimeToLiveSpecification: {
      Enabled: true,
      AttributeName: "expiredAt",
    },
  });
  const response = await client.send(command);
  console.log(response);
}

async function insertLog() {
  // 1時間後
  let expiredAt1 = new Date();
  expiredAt1.setHours(expiredAt1.getHours() + 1);

  // 30秒後
  let expiredAt2 = new Date();
  expiredAt2.setSeconds(expiredAt2.getSeconds() + 30);

  const logs = [
    {
      category: "app",
      seq: 1,
      logContent: "ログです１",
      expiredAt: Math.floor(expiredAt1 / 1000),
    },
    {
      category: "app",
      seq: 2,
      logContent: "ログです２",
      expiredAt: Math.floor(expiredAt2 / 1000),
    },
  ];

  for (const log of logs) {
    const response = await docClient.send(
      new PutCommand({
        TableName: "logSandbox",
        Item: log,
      })
    );
    console.log(response);
  }
}

async function main() {
  await createLogSandbox01Table()
  await updateTTL();
  await insertLog();
}

main();
