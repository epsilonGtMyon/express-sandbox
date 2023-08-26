import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
  endpoint: process.env.ENDPOINT,
  forcePathStyle: true,
});

function useS3Client() {
  return s3;
}

export { useS3Client };
