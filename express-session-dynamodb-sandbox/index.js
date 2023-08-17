require("dotenv").config();
const express = require("express");
const session = require("express-session");
const DynamoDBStore = require("connect-dynamodb")({ session: session });
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const cookieParser = require("cookie-parser");

const app = express();

//---------------------------
// 使用するテンプレートエンジンの指定
app.set("view engine", "ejs");

//---------------------------
// middleware

app.use(cookieParser());
app.use(
  session({
    store: new DynamoDBStore({
      // https://github.com/ca98am79/connect-dynamodb#usage
      // テーブル名
      table: "myapp-session",
      // クライアント：ローカルのものを使う場合はつけておく
      client: new DynamoDBClient({ endpoint: "http://localhost:8000" }),
    }),
    secret: "keyboard cat",
    name: `my-session`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static("public"));
app.use(express.json());

//---------------------------
// endpoint

// セッションにカウントアップした値を保存するだけのエンドポイント
app.get("/count", (req, res) => {
  let count = req.session.count ?? 0;
  count++;
  req.session.count = count;
  res.send({
    value: count,
  });
});

const port = Number(process.env.port ?? "80");
app.listen(port, () => {
  console.log(`started: http://localhost:${port}`);
});
