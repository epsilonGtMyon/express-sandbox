// mysql2/promiseを使うことで各種操作がpromiseを返すのでawaitできるようになる。
import mysql from "mysql2/promise";

let pool = null;

async function initializePool() {
  // コネクションプールの作成
  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
}

function getPool() {
  if (pool === null) {
    throw new Error(`Pool does not initialize`);
  }
  return pool;
}

function endPool() {
  // コネクションプールの終了
  return pool.end();
}

function getConnection() {
  return pool.getConnection();
}

function releaseConnection(connection) {
  return pool.releaseConnection(connection);
}

export { initializePool, getPool, endPool, getConnection, releaseConnection };
