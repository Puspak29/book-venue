'use server';
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function deleteSession() {

    const sessionCoockie = cookies().get('appwrite-session');
    if(!sessionCoockie) {
        return {error: 'Session not found'};
    }

    try {
        const { account } = await createSessionClient(sessionCoockie.value);

        await account.deleteSession('current');

        (await cookies()).delete('appwrite-session');
       
        return {success: true};
    } catch (error) {
        return {error: 'Error'};
    }

}

export default deleteSession;