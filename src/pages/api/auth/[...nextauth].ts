import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
    providers: [CognitoProvider({
        clientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_APP_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_AWS_USER_POOL_APP_CLIENT_SECRET,
        issuer: process.env.NEXT_PUBLIC_AUTH_ISSUER,
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        client: {
            token_endpoint_auth_method: "none"
        }
    })]
}

export default NextAuth(authOptions)