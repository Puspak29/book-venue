'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";

function toUTCDateTime(dateString){
    return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}

function dateOverlap(checkIn1, checkOut1, checkIn2, checkOut2) {
    return (checkIn1 < checkOut2 && checkIn2 < checkOut1);

}

async function checkAvailability(venueId, checkIn, checkOut) {
    const sessionCookie = cookies().get('appwrite-session');
    if (!sessionCookie) {
        return redirect('/login');
    }

    try{

        const { databases } = await createSessionClient(sessionCookie.value);

        const checkInDateTime = toUTCDateTime(checkIn);
        const checkOutDateTime = toUTCDateTime(checkOut);
        
        const { documents: bookings } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            [Query.equal('venue_id',venueId)]
        );

        for(const booking of bookings){
            const bookingCheckIn = toUTCDateTime(booking.check_in);
            const bookingCheckOut = toUTCDateTime(booking.check_out);

            if(dateOverlap(checkInDateTime, checkOutDateTime, bookingCheckIn, bookingCheckOut)){
                return false;
            }
        }

        return true;
       

    }catch(e){
        console.error("error",e)
        return {
            erroe: 'Failed to check availability',
        }
    }
}

export default checkAvailability;