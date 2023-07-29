import "dotenv/config";

import * as connectionPool from "./connectionPool.js";

await connectionPool.initializePool();

// プールから取得
const connection = await connectionPool.getConnection();

try {
  await connection.beginTransaction();

  // insert
  await insertMessage(connection, "hello2", new Date());

  // select
  const [results] = await selectAll(connection);
  console.log(results);

  await connection.commit();
} catch (e) {
  await connection.rollback();
  throw e;
} finally {
  // プールに返却
  await connectionPool.releaseConnection(connection);
}

await connectionPool.endPool();

//---------
async function insertMessage(con, mesasge, createdAt) {
  return await con.query(
    `
  INSERT INTO message (
     message
    ,created_at
  ) VALUES (
     ?
    ,?
  )`,
    [mesasge, createdAt]
  );
}

async function selectAll(con) {
  return await con.query(`
SELECT
  id
  ,message
  ,created_at AS createdAt
FROM
  message
ORDER BY
  id
`);
}
