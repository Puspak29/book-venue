'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";

async function getMylist() {
    const sessionCookie = cookies().get('appwrite-session');
    if (!sessionCookie) {
        return redirect('/login');
    }

    try{

        const { account, databases } = await createSessionClient(sessionCookie.value);
        const user = await account.get();
        const userId = user.$id;
        
        const { documents: venues } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_VENUE,
            [Query.equal('user_id',userId)]
        );

        return venues;

    }catch(e){
        console.error("error",e)
        redirect("/error")
    }
}

export default getMylist;