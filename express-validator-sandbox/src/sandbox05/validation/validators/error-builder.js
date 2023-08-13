/**
 * 検証エラーの例外を生成するクラス
 * 
 * 入力チェックの関数からメッセージのフォーマッターに情報を渡す方法がない？ので
 * エラーのメッセージにJSONをつめて渡す、その情報を作るためのクラス
 */
class ErrorBuilder {
  /** メッセージのキー */
  #messageKey;

  /** 検証メッセージのオプション */
  #option;

  constructor(messageKey) {
    this.#messageKey = messageKey;
  }

  option(option) {
    this.#option = option;
    return this;
  }

  build() {
    const obj = {
      key: this.#messageKey,
    };  

    if (this.#option !== undefined) {
      obj.option = this.#option;
    }
  
    return new Error(JSON.stringify(obj));
  }

  throw() {
    const error =  this.build();
    throw error
  }
}

/**
 * ビルダーのインスタンスを生成
 * @param {*} messageKey 
 * @returns 
 */
function errorBuilder(messageKey) {
  const errorBuilder = new ErrorBuilder(messageKey);
  return errorBuilder;
}

module.exports.errorBuilder = errorBuilder;
