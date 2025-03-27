'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import checkAuth from "./checkAuth";

async function cancelBooking(bookingId) {
    const sessionCookie = cookies().get('appwrite-session');
    if (!sessionCookie) {
        return redirect('/login');
    }

    try{

        const { databases } = await createSessionClient(sessionCookie.value);
        const { user } =  await checkAuth();
        if(!user) return redirect("/login");


        const booking = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            bookingId
        );

        if(booking.user_id !== user.id){
            return {
                error: "Unauthorized"
            }
        }
        

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            bookingId
        );

        revalidatePath('/bookings', 'layout');    

        return {
            success: true
        }    
        

    }catch(e){
        console.error("error",e)
        redirect("/error")
    }
}

export default cancelBooking;