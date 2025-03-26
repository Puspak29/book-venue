'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";

async function getBookings() {
    const sessionCookie = cookies().get('appwrite-session');
    if (!sessionCookie) {
        return redirect('/login');
    }

    try{

        const { databases } = await createSessionClient(sessionCookie.value);
        const { user } = await checkAuth();

        if(!user){
            return {
                error: "You must be logged in"
            }
        }
        
        const { documents: bookings } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            [Query.equal('user_id',user.id)]
        );

        return bookings;

    }catch(e){
        console.error("error",e)
        return {
            error: "Something went wrong fetching your bookings"
        }
    }
}

export default getBookings;