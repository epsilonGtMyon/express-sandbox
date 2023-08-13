const express = require("express")

const { query, validationResult } = require('express-validator');


const router = express.Router()


router.get("/", 
//クエリパラメータに対して検証する場合はqueryを使う
query('person').notEmpty().escape(),
// 
(req, res) => {
  // 検証結果はvalidationResultでリクエストから取り出す
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`sandbox01, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
})


module.exports = router