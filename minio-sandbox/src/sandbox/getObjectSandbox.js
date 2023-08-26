import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { useS3Client } from "../common/useS3Client.js";

const __dirname = fileURLToPath(import.meta.url);

const s3 = useS3Client();
const Bucket = "hello-backet";

const _workdirPath = path.resolve(__dirname, "../../../_work");
const filePath = path.resolve(_workdirPath, `${Date.now()}.dat`);

const response = await s3.send(
  new GetObjectCommand({
    Bucket,
    Key: "image01.png",
  })
);

// 雑だけど全部一気に読み取って保存する。
const bArray = await response.Body.transformToByteArray();
if (!fs.existsSync(_workdirPath)) {
  fs.mkdirSync(_workdirPath, { recursive: true });
}
fs.writeFileSync(filePath, bArray);
