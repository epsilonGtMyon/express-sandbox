const MessageKey = Object.freeze({
  required: "required",
  maxLength: "maxLength",
});

const Messages_ja = Object.freeze({
  required: "必須です。",
  maxLength: "{max}文字以内で入力してください。",
});

/**
 * メッセージを取得します。
 * @param {string} messageKey  メッセージのキー
 * @param {any} option オプション
 * @returns {string} メッセージ
 */
function getMessage(messageKey, option) {
  /** @type {string | undefined} */
  const messageTemplate = Messages_ja[messageKey];
  if (messageTemplate == undefined) {
    return messageTemplate;
  }
  if (option == undefined) {
    return messageTemplate;
  }

  // メッセージテンプレートの{xxx} の部分を置き換える
  return Object.entries(option).reduce((mes, [k, v]) => {
    const regexp = new RegExp(`{${k}}`);
    return mes.replace(regexp, v)
  }, messageTemplate);
}

module.exports.MessageKey = MessageKey;
module.exports.getMessage = getMessage;
