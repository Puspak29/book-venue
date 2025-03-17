'use server';
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function createSession(previousState,data) {
    const email= data.get('email');
    const password = data.get('password');

    if(!email || !password) {
        return {error: 'Email and password are required'};
    }

    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set('appwrite-session', session.secret, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            expire: new Date(session.expire),
            path: '/'
        })

        return {success: true};
    } catch (error) {
        console.log('auth error', error);
        return {error: 'Invalid email or password'};
    }

}

export default createSession;