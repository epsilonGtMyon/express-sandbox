require("dotenv").config();

const { BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../../common/docClient.js");

async function main() {
  const command1 = new BatchWriteCommand({
    RequestItems: {
      score: [
        {
          PutRequest: {
            Item: {
              student: "Taro",
              subject: `Math`,
              score_value: 75,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              student: "Taro",
              subject: `Japanese`,
              score_value: 82,
            },
          },
        },
      ],
    },
  });

  const response1 = await docClient.send(command1);

  //-----------------------------

  const sourceScores = [
    {
      name: "Ichiro",
      Japanese: 80,
      English: 70,
      Math: 60,
      Science: 50,
      SocialStudies: 73,
    },
    {
      name: "Jiro",
      Japanese: 82,
      English: 73,
      Math: 64,
      Science: 55,
      SocialStudies: 78,
    },
  ];

  const scores = sourceScores.map((s) => {
    const scoreItems = [];
    for (const [k, v] of Object.entries(s)) {
      if (k === "name") continue;

      scoreItems.push({
        PutRequest: {
          Item: {
            student: s.name,
            subject: k,
            score_value: v,
          },
        },
      });
    }
    return scoreItems;
  }).flatMap(s => s);

  const command2 = new BatchWriteCommand({
    RequestItems: {
      score: [...scores]
    },
  });

  const response2 = await docClient.send(command2);
}

main();
