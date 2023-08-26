import "dotenv/config";
import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { useS3Client } from "../common/useS3Client.js";

const s3 = useS3Client();
const Bucket = "hello-backet"

//S3バケットを作成する
await s3.send(
  new CreateBucketCommand({
    Bucket,
  })
);
