const express = require("express");
const { body, checkSchema, validationResult } = require("express-validator");

//--------------------

// withDefaultsは新しいResultFactoryを返す
// つまりvalidationResultみたいにリクエストからエラーを返す関数を作る
const myValidationResult = validationResult.withDefaults({
  formatter: (e) => ({ msg: e.msg }),
});

function handleValidationResultMiddleware(req, res, next) {
  const result = validationResult(req);
  console.log("--1");
  console.log(result);
  console.log("--2");
  console.log(myValidationResult(req).array());
  console.log("--3");
  console.log(result.formatWith((i) => i.path).array());

  if (result.isEmpty()) {
    next();
    return;
  }

  res.status(400).send({ errors: result.array() });
}
//--------------------
const router = express.Router();

router.get("/", (req, res) => {
  res.render("sandbox04/index", { title: "sandbox04" });
});

// 個別で項目指定
router.post(
  "/post1",
  // -----------
  // 通常の単一値
  body("value01").notEmpty().isLength({ max: 5 }),
  // -----------
  // ネスト要素
  body("department.name").notEmpty(),
  // -----------
  // 配列要素数
  body("users").custom((value) => {
    if (!Array.isArray(value)) {
      return true;
    }

    return value.length > 0;
  }),
  // 配列要素
  body("users[*].firstName").notEmpty(),
  handleValidationResultMiddleware,
  (req, res) => {
    res.send({
      value: "OK",
    });
  }
);


router.post(
  "/post2",
  // スキーマ形式で定義
  checkSchema({
    value01: {
      notEmpty: true,
      isLength: {
        options: { max: 5 },
      },
    },
    // ネスト要素の書き方
    "department.name": {
      notEmpty: true,
    },
    // 配列要素の書き方
    "users[*].firstName": {
      notEmpty: true,
    },
  }),
  handleValidationResultMiddleware,
  (req, res) => {
    res.send({
      value: "OK",
    });
  }
);

module.exports = router;
