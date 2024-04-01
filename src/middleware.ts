import {withAuth} from "next-auth/middleware"

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/login',
    }
})
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - login (login Endpoint)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        `/((?!login|_next/static|_next/image|favicon.ico).*)`,
    ],
}
