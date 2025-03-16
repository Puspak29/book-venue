'use server';

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAllVenues() {
    try{

        const { databases } = await createAdminClient();
        
        const { documents: venues } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_VENUE
        );

        // revalidatePath('/', 'layout');
        return venues;

    }catch(e){
        console.error("error",e)
        redirect("/error")
    }
}

export default getAllVenues;