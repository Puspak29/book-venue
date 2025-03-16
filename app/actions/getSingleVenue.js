'use server';

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getSingleVenue(id) {
    try{

        const { databases } = await createAdminClient();
        
        const venue = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_VENUE,
            id
        );

        // revalidatePath('/', 'layout');
        return venue;

    }catch(e){
        console.error("error",e)
        redirect("/error")
    }
}

export default getSingleVenue;