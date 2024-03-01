import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {StreamingBlobPayloadInputTypes} from "@smithy/types";

export const uploadToS3 = async (key: string, file?: StreamingBlobPayloadInputTypes) => {
    if (!process.env.NEXT_PUBLIC_AWS_REGION || !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || !process.env.NEXT_PUBLIC_AWS_BUCKET_NAME) {
        throw new Error('AWS environment variables not set');
    }
    const client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        }
    });
    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: key,
        Body: file,
    });
    return client.send(command);
};