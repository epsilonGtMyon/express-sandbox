import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useS3Client } from "../common/useS3Client.js";

const __dirname = fileURLToPath(import.meta.url);

const s3 = useS3Client();
const Bucket = "hello-backet";

const imageDirPath = path.resolve(__dirname, "../../../images");
const filePath = path.resolve(imageDirPath, "image01.png");
const fileName = path.basename(filePath)

await s3.send(
  new PutObjectCommand({
    Bucket,
    Key: fileName,
    //ContentType: "image/png",
    Body: fs.readFileSync(filePath),
  })
);
