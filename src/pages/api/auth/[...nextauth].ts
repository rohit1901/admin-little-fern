import NextAuth, {AuthOptions} from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: AuthOptions = {
    providers: [
        Auth0Provider({
            clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
            issuer: process.env.NEXT_PUBLIC_AUTH0_ISSUER,
            idToken: true
        })
    ],
    pages: {
        signIn: "/login",
    },
    // Documentation for callbacks: https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // The JWT callback is called any time a token is written to
        // updates the token with the idToken and accessToken fetched from the provider
        jwt: async ({token, account}) => {
            if (account) {
                token.idToken = account.id_token
                token.accessToken = account.access_token
            }
            return Promise.resolve(token)
        },
        // The session callback is called before a session object is returned to the client
        // updates the session with the idToken and accessToken from the JWT token
        session: async ({session, token}) => {
            return {...session, idToken: token.idToken, accessToken: token.accessToken}
        },
        redirect: async ({url, baseUrl}: { url: string, baseUrl: string }) => {
            const isRelativeUrl = url.startsWith("/");
            if (isRelativeUrl) {
                return `${baseUrl}${url}`;
            }

            const isSameOriginUrl = new URL(url).origin === baseUrl;
            const alreadyRedirected = url.includes('callbackUrl=')
            if (isSameOriginUrl && alreadyRedirected) {
                return decodeURIComponent(url.split('callbackUrl=')[1]);
            }

            if (isSameOriginUrl) {
                return url;
            }

            return baseUrl;
        }
    },
}

export default NextAuth(authOptions)