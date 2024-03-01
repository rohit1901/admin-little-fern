declare namespace NodeJS {
    export interface ProcessEnv {
        PUBLIC_AWS_USER_POOL_ID: string
        PUBLIC_AWS_USER_POOL_APP_CLIENT_ID: string
        PUBLIC_AWS_USER_POOL_APP_CLIENT_SECRET: string
        COGNITO_ISSUER: string
        AWS_CLOUDFRONT_URL: string
        NEXT_PUBLIC_AWS_REGION: string
        NEXT_AUTH_ISSUER: string
        DB_NAME: string
        NEXT_PUBLIC_AWS_ACCESS_KEY_ID: string
        NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: string
        NEXT_PUBLIC_AWS_BUCKET_NAME: string
    }
}
