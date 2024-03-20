import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
    providers: [
        Auth0Provider({
            clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
            issuer: process.env.NEXT_PUBLIC_AUTH0_ISSUER,

        })
    ]
}

export default NextAuth(authOptions)