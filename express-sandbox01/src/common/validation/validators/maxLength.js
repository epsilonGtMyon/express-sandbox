import { MessageKey } from "./errorMesage/message.js";
import { errorBuilder } from "./errorMesage/errorBuilder.js";

/**
 * 最大長検証
 * @param {*} value
 * @param {*} max
 * @returns
 */
function validate(value, max) {
  if (value == null) {
    return true;
  }

  if (typeof value !== "string") {
    return true;
  }

  if (value.length <= max) {
    return true;
  }

  return false;
}

/**
 * 最大長検証の生成
 * @param {*} option
 * @returns
 */
function create(option) {
  const max = option.max;
  return (value) => {
    if (validate(value, max)) {
      return true;
    }
    errorBuilder(MessageKey.maxLength).option(option).throw();
  };
}

export default { create };
