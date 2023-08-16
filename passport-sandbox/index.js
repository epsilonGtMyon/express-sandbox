const express = require("express");
const session = require("express-session");
const passport = require("passport");

require("./src/common/auth/authConfigure.js");

const app = express();

//---------------------------
// 使用するテンプレートエンジンの指定
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

// 認証した情報はセッションに保持するので passport.session の手前でセッションを使う
app.use(
  session({
    secret: "keyboard cat",
    name: `my-session`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// セッションから認証の情報をデシリアライズしている
// 特に判定みたいなことはしていなさそう
//app.use(passport.authenticate("session")); の省略形
app.use(passport.session());

// ログインしてない場合はダメってやつをする
const authorizeMatchers = [
  (path) => ["/private"].some((p) => path.startsWith(p)),
];
app.use((req, res, next) => {
  const path = req.path;
  const unauthenticated = req.isUnauthenticated();

  if (unauthenticated) {
    if (authorizeMatchers.some((matcher) => matcher(path))) {
      //認証が必要

      res.status(403).send();
      return;
    }
  }

  next();
});

//-------------

app.get("/", (req, res) => {
  res.render("login/index");
});

// 認証を行う
app.post(
  "/login",
  passport.authenticate("local", {
    // ↓trueになるとnextにエラーの情報が渡った状態になる
    // falseだと401が返却されるだけ
    // failWithError: true
  }),
  (req, res) => {
    // ここは認証成功時に実行
    res.status(204).send();
  }
);

// 直接ハンドリングする場合はこちら
// 認証成功時にセッションIDが変わらないのでそういったものは全てアプリ側で責任を持つ必要あり。
// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, userOrFalse, info) => {
//     // infoにはLocalStrategyのコールバックに渡したものが来る

//     if (err) {
//       // 認証中のエラー
//       next(err);
//       return;
//     }

//     if (userOrFalse === false) {
//       // 認証失敗
//       res.status(400).send({
//         info,
//       });
//       return;
//     }

//     // 認証成功
//     res.status(200).send({
//       info,
//     });
//   })(req, res, next);
// });

app.post("/logout", (req, res) => {
  req.logout((err) => {
    res.status(204).send();
  });
});

app.post("/printUser", (req, res) => {
  console.log("---------");
  console.log("authInfo= ", req.authInfo);
  console.log("user= ", req.user);
  console.log("isAuthenticated()= ", req.isAuthenticated());
  console.log("isUnauthenticated= ", req.isUnauthenticated());
  res.send({ value: "OK" });
});

app.post("/private", (req, res) => {
  res.send("OK");
});
app.post("/public", (req, res) => {
  res.send("OK");
});

const port = 8080;
app.listen(port, () => {
  console.log(`started port = ${port}`);
});
