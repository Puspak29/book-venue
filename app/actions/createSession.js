'use server';
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import checkAuth from "./checkAuth";

async function createSession(previousState,data) {
    const email= data.get('email');
    const password = data.get('password');

    if(!email || !password) {
        return {error: 'Email and password are required'};
    }

    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailPasswordSession(email, password);

        const cookie = await cookies();
        cookie.set('appwrite-session', session.secret, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            expire: new Date(session.expire),
            path: '/'
        });
        // console.log(session);

        const { user } = await checkAuth();

        return {success: true, user: {
                id: user.id,
                email: user.email,
                name: user.name
        }};
    } catch (error) {
        // console.log('auth error', error);
        return {error: 'Invalid email or password'};
    }

}

export default createSession;