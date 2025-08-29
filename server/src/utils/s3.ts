import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const {
  CF_R2_ACCESS_ENDPOINT,
  CF_R2_ACCESS_KEY_ID,
  CF_R2_SECRET_ACCESS_KEY,
  CF_R2_BUCKET_NAME
} = process.env;

const s3Client = new S3Client({
  region: 'auto',
  endpoint: CF_R2_ACCESS_ENDPOINT!,
  credentials: {
    accessKeyId: CF_R2_ACCESS_KEY_ID!,
    secretAccessKey: CF_R2_SECRET_ACCESS_KEY!
  }
});

export const getUploadUrl = async (key: string) => {
  return await getSignedUrl(s3Client, new PutObjectCommand({
    Bucket: CF_R2_BUCKET_NAME!,
    Key: key
  }), { expiresIn: 60 });
};
