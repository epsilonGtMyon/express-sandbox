const express = require("express");
const { query, body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("sandbox02/index", { title: "sandbox02" });
});

router.get(
  "/get",
  // それぞれのフィールド毎に検証を定義、配列でもよさそう
  query("value01").notEmpty().isAlpha(),
  query("value02").notEmpty().isAlpha(),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
      return;
    }

    res.send("sandbox02");
  }
);

router.post(
  "/post",
  // リクエストボディに対して検証をするときはbodyを使う
  body("value01").notEmpty().isAlpha(),
  body("value02").notEmpty().isAlpha(),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
      return;
    }

    res.send("sandbox02");
  }
);

module.exports = router;
