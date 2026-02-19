'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function checkAuth(){
    const cookie = await cookies();
    const sessionCookie = cookie.get('appwrite-session');
    if(!sessionCookie) {
        return {isAuth: false};
    }

    try {
        const { account } = await createSessionClient(sessionCookie.value);
        const user = await account.get();

        return {
            isAuth: true, 
            user: {
                id: user.$id,
                name: user.name,
                email: user.email
            }
        };
        
    } catch (error) {
        return {isAuth: false, user: null};
    }

}

export default checkAuth;