import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

export const uploadFile = (fileName: string, data: any) => {
  return new Upload({
    client: new S3Client(),
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${fileName}`,
      Body: JSON.stringify(data),
    },
    tags: [],
  }).done();
};
