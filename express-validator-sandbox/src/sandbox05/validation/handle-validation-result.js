const { validationResult } = require("express-validator");
const { getMessage } = require("./validators/message");

/**
 * エラーメッセージの整形
 * @param {*} validationError 
 * @param {*} req 
 * @returns 
 */
function formatMessage(validationError, req) {
  const rawMsg = validationError.msg;
  if (rawMsg === "Invalid value") {
    return rawMsg;
  }

  const errorDetail = JSON.parse(rawMsg);
  return getMessage(errorDetail.key, errorDetail.option);
}

/**
 * 検証結果をハンドリングするミドルウェア
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
function handleValidationResult(req, res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    // エラーなし
    next();
    return;
  }

  const ex = result.formatWith((er) => {
    return {
      ...er,
      message: formatMessage(er, req),
    };
  });

  res.status(400).send({ errors: ex.array() });
}

module.exports.handleValidationResult = handleValidationResult;
