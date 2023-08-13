import { validationResult } from "express-validator";
import { getMessage } from "./validators/errorMesage/message.js";

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
      path: er.path,
      message: formatMessage(er, req),
    };
  });

  res.status(400).send({ errors: ex.array() });
}

export { handleValidationResult };
