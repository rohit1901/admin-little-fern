declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_PUBLIC_AWS_USER_POOL_ID: string
        NEXT_PUBLIC_AWS_USER_POOL_APP_CLIENT_ID: string
        NEXT_PUBLIC_AWS_USER_POOL_APP_CLIENT_SECRET: string
        NEXT_PUBLIC_AWS_CLOUDFRONT_URL: string
        NEXT_PUBLIC_AWS_REGION: string
        NEXT_PUBLIC_AUTH_ISSUER: string
        NEXT_PUBLIC_DB_NAME: string
        NEXT_PUBLIC_AWS_ACCESS_KEY_ID: string
        NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: string
        NEXT_PUBLIC_AWS_BUCKET_NAME: string
        NEXT_PUBLIC_CLOUDFRONT_DOMAIN: string
        NEXT_PUBLIC_ADMIN_EMAILS: string
        NEXT_PUBLIC_MAP_URI: string
    }
}
