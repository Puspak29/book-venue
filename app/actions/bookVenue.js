'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import checkAvailability from "./ckeckAvailability";

async function bookVenue(previousState, formData) {
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

        const checkInDate = formData.get('check_in_date');
        const checkInTime = formData.get('check_in_time');
        const checkOutDate = formData.get('check_out_date');
        const checkOutTime = formData.get('check_out_time');
        const venueId = formData.get('venue_id');

        // iso 8601 format

        const checkInDatetime = `${checkInDate}T${checkInTime}`;
        const checkOutDatetime = `${checkOutDate}T${checkOutTime}`;

        const isAvailable = await checkAvailability(venueId, checkInDatetime, checkOutDatetime);
        if(!isAvailable){
            return {
                error: "Venue is not available for the selected timeslot"
            }
        }

        const bookingData = {
            check_in : checkInDatetime,
            check_out : checkOutDatetime,
            user_id : user.id,
            venue_id : venueId,
        }


        const newBooking = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            ID.unique(),
            bookingData,
        )

        revalidatePath('/bookings', 'layout')
        
        return {
            success: true
        }

    }catch(e){
        console.error("error",e)
        return {
            error: "Something went wrong booking the venue"
        }
    }
}

export default bookVenue;