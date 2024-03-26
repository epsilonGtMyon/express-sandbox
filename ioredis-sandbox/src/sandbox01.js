import crypto from "node:crypto";
import Redis from "ioredis";
const redis = new Redis();

async function setRandom() {
  for (let i = 0; i < 10; i++) {
    const key = crypto.randomUUID();
    const value = Math.floor(Math.random() * 10000);
    // EX, 30 で30秒で消える
    const r = await redis.set(key, value, 'EX', 30);
    console.log(`${i}:${r}`);
  }
}

async function getAll() {
  const keys = await redis.keys("*");

  const promises = keys.map(async (k) => {
    const v = await redis.get(k);
    return { key: k, value: v };
  });

  const promises2 = await Promise.allSettled(promises);
  return promises2.map((p) => p.value);
}

async function main() {

  await setRandom()

  const records = await getAll();
  console.log(records);

  // 全て消す
  // await redis.flushall()
}

try {
  await main();
} finally {
  redis.disconnect();
}
