import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {StreamingBlobPayloadInputTypes} from "@smithy/types";
import * as AWS from 'aws-sdk';
import {AWSError} from "aws-sdk/lib/error";


export const uploadToS3 = async (key: string, file?: StreamingBlobPayloadInputTypes) => {
    if (!process.env.NEXT_PUBLIC_AWS_REGION || !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || !process.env.NEXT_PUBLIC_AWS_BUCKET_NAME) {
        throw new Error('AWS environment variables not set');
    }
    const client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION, credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        }
    });
    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME, Key: key, Body: file,
    });
    return client.send(command);
};
export const getS3Status = (callback: (err: AWSError, data: AWS.S3.Types.HeadBucketOutput) => void) => {

// Set the region
    AWS.config.update({region: process.env.NEXT_PUBLIC_AWS_REGION});

// Create S3 service object
    const s3 = new AWS.S3({
        apiVersion: '2006-03-01', credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        }
    });

// Define the parameters for calling listBuckets
    const bucketParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    };

// Call S3 to check if the bucket exists
    return s3.headBucket(bucketParams, callback);
}