import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl
    const role = req.auth?.user?.role

    const isAdminRoute = pathname.startsWith('/dashboard/admin')
    const isOwnerRoute = pathname.startsWith('/dashboard/owner')
    const isProtectedApi = pathname.startsWith('/api/bookings')

    if (isAdminRoute) {
        if (!isLoggedIn) return NextResponse.redirect(new URL('/auth/signin', req.nextUrl))
        if (role !== 'ADMIN') return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if (isOwnerRoute) {
        if (!isLoggedIn) return NextResponse.redirect(new URL('/auth/signin', req.nextUrl))
        if (role !== 'OWNER' && role !== 'ADMIN') return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if (isProtectedApi && !isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/api/bookings'],
}
