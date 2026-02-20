'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function deleteVenue(venueId) {
    const cookie = await cookies();
    const sessionCookie = cookie.get('appwrite-session');
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
        // console.log(venueId.venueId);
        // console.log("Available venue IDs:", venues.map(v => v.$id));
        const venueToDelete = venues.find((venue) => venue.$id === venueId.venueId);
        // console.log(venueToDelete);

        if(venueToDelete){
            console.log(venueToDelete.$id);
            const res = await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_VENUE,
                venueToDelete.$id
            );

            revalidatePath('/venues/mylist', 'layout');
            revalidatePath('/', 'layout');

            return {
                success: true
            }
        }
        else{
            return {
                error: 'Venue not found'
            }
        }


    }catch(e){
        console.error("error",e)
        return {
            error: 'Failed to delete venue'
        }
    }
}

export default deleteVenue;