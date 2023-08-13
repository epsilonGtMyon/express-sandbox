const express = require("express");
const { ExpressValidator } = require("express-validator");

const { query, body, validationResult } = new ExpressValidator({
  // カスタムバリデーション
  isAlphaNum(value) {
    if (value == null || value == "") {
      return true;
    }
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      return true;
    }
    throw new Error("半角英数で入力してください。");
  },
});

const router = express.Router();

/**
 * バリデーションエラーをハンドリングするミドルウェア
 * ハンドリングはミドルウェアですることもできる。
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function handleValidationResultMiddleware(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    // エラーがないときはそのまま次へ
    next();
    return;
  }

  res.status(400).send({ errors: result.array() });
}

router.get("/", (req, res) => {
  res.render("sandbox03/index", { title: "sandbox03" });
});

router.post(
  "/post1",
  // カスタムバリデーション(Errorでメッセージ)
  body("value01").custom((value) => {
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      // 検証通過したときはtrueを返す
      return true;
    }
    // return falseにするとメッセージはInvalid valueとなる
    throw new Error(`英数字で入力してください。`);
  }),
  
  // カスタムバリデーション(withMessageでメッセージ)
  body("value02")
    .custom((value) => {
      return /^[a-zA-Z0-9]*$/.test(value);
    })
    // withMessageでメッセージを上書きすることもできる。
    .withMessage(`英数字で入力してください。2`),
  handleValidationResultMiddleware,
  (req, res) => {
    res.send("sandbox03");
  }
);

router.post(
  "/post2",
  body("value01").isAlphaNum(),
  // メッセージの上書き
  // 検証単位で上書きすることもできる。
  body("value02")
    .isAlphaNum()
    .withMessage("半角英数で") // 半角英数の時のメッセージ

    .notEmpty()
    .withMessage("必須"), // 必須の時のメッセージ
  handleValidationResultMiddleware,
  (req, res) => {
    res.send("sandbox03");
  }
);

module.exports = router;
