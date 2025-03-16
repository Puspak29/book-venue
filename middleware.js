import { NextResponse } from 'next/server';

export async function middleware(req) {
    const isAuthorized = false;
    if (!isAuthorized) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/bookings', '/venues/mylist'],
}