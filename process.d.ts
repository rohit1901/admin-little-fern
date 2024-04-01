declare namespace NodeJS {
    export interface ProcessEnv {
        // NextAuth
        NEXTAUTH_SECRET: string
        NEXTAUTH_URL: string
        // Auth0
        NEXT_PUBLIC_AUTH0_ISSUER: string
        NEXT_PUBLIC_AUTH0_CLIENT_ID: string
        NEXT_PUBLIC_AUTH0_CLIENT_SECRET: string
        // AWS Cognito
        NEXT_PUBLIC_AWS_USER_POOL_ID: string
        NEXT_PUBLIC_AWS_USER_POOL_APP_CLIENT_ID: string
        NEXT_PUBLIC_AWS_USER_POOL_APP_CLIENT_SECRET: string
        // DB
        NEXT_PUBLIC_DB_NAME: string
        // AWS S3
        NEXT_PUBLIC_AWS_ACCESS_KEY_ID: string
        NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: string
        NEXT_PUBLIC_AWS_BUCKET_NAME: string
        // AWS CloudFront
        NEXT_PUBLIC_AWS_CLOUDFRONT_URL: string
        NEXT_PUBLIC_AWS_REGION: string
        NEXT_PUBLIC_AUTH_ISSUER: string
        NEXT_PUBLIC_CLOUDFRONT_DOMAIN: string
        // Application
        NEXT_PUBLIC_ADMIN_EMAILS: string
        NEXT_PUBLIC_MAP_URI: string
        // PartyKit
        NEXT_PUBLIC_PARTYKIT_HOSTNAME: string
        NEXT_PUBLIC_PARTYKIT_ROOM: string
    }
}
