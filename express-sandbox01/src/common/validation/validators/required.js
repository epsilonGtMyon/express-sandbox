import { MessageKey } from "./errorMesage/message.js";
import { errorBuilder } from "./errorMesage/errorBuilder.js";

/**
 * 必須検証
 *
 * @param {*} value
 * @returns
 */
function validate(value) {
  if (value == null) {
    return false;
  }
  if (value === "") {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
}

/**
 * 必須検証の生成
 * @returns
 */
function create() {
  return (value) => {
    if (validate(value)) {
      return true;
    }
    errorBuilder(MessageKey.required).throw();
  };
}

export default { create };
