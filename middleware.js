import { NextResponse } from 'next/server';
import checkAuth from './app/actions/checkAuth';

export async function middleware(req) {
    const {isAuth} = await checkAuth();
    if (!isAuth) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/bookings', '/venues/add', '/venues/mylist']
}