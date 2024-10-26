import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, NextMiddleware, NextFetchEvent } from "next/server";

const onlyAdmin = ['/admin']

export default function WithAuth(Middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        if (requireAuth.includes(pathname)) {
            const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

            if (!token) {
                const url = new URL('/auth/register', req.url)
                url.searchParams.set("callbackUrl", encodeURI(req.url))
                return NextResponse.redirect(url)
            }

            if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
                return NextResponse.redirect(new URL('/', req.url))
            }
        }
        return Middleware(req, next)
    }
}