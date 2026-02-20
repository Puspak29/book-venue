'use server';
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function deleteSession() {

    const cookie = await cookies();
    const sessionCookie = cookie.get('appwrite-session');
    if(!sessionCookie) {
        return {error: 'Session not found'};
    }

    try {
        const { account } = await createSessionClient(sessionCookie.value);

        await account.deleteSession('current');

        (await cookies()).delete('appwrite-session');
       
        return {success: true};
    } catch (error) {
        return {error: 'Error'};
    }

}

export default deleteSession;