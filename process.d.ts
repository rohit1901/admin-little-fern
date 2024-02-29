declare namespace NodeJS {
    export interface ProcessEnv {
        PUBLIC_AWS_USER_POOL_ID: string
        PUBLIC_AWS_USER_POOL_APP_CLIENT_ID: string
        PUBLIC_AWS_USER_POOL_APP_CLIENT_SECRET: string
        COGNITO_ISSUER: string
        AWS_CLOUDFRONT_URL: string
        AWS_REGION: string
    }
}
