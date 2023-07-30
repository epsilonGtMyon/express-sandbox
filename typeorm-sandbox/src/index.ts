import "dotenv/config";
import "reflect-metadata";

import { AppDataSource, initializeDataSource } from "./db/data-source";
import { Message } from "./db/message";

/**
 * とりあえず単純な操作だけ
 */
async function main() {
  // データソース初期化
  await initializeDataSource();

  await AppDataSource.manager.transaction(async (tranEm) => {
    // tranEmを使って操作しないと 未コミットのデータが見えない
    const messageRepository = tranEm.getRepository(Message);

    // 保存
    const message = new Message();
    message.message = `hello ${Date.now()}`;
    message.createdAt = new Date();
    await messageRepository.save(message);
    
    // 取得
    const messages = await messageRepository.find()
    console.log(messages)

    // 生クエリ
    const result2 = await tranEm.query(`SELECT * FROM message ORDER BY id DESC`)
    console.log(result2)
  });


  // データソース破棄
  await AppDataSource.destroy()
}

main();
