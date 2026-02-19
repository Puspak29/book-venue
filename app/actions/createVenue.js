'use server';

import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

async function createVenue(previousState, formData) {
    const { databases, storage } = await createAdminClient();

    try {

        const { user } = await checkAuth();

        if(!user) {
            return {error: 'You must be logged in to create a venue'};
        }

        let imageID;
        const image = formData.get('image');
        if(image && image.size > 0 && image.name !== 'undefined') {
            try {

                const response = await storage.createFile(
                    process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_VENUE, 
                    ID.unique(), 
                    image);
                imageID = response.$id;
                
            } catch (error) {
                // console.log('image upload error', error);
                return {error: 'Error uploading image'};
            }
        }else{
            console.log('No image uploaded or image is invalid');
        }

        const newRoom = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_VENUE,
            ID.unique(),
            {
                user_id: user.id,
                name: formData.get('name'),
                description: formData.get('description'),
                address: formData.get('address'),
                location: formData.get('location'),
                availability: formData.get('availability'),
                sqft: formData.get('sqft'),
                capacity: formData.get('capacity'),
                price_per_hour: formData.get('price_per_hour'),
                amenities: formData.get('amenities'),
                image: imageID,

            }
        );

        revalidatePath('/', 'layout');

        return {
            success: true
        }
        
    } catch (error) {
        // console.log('createVenue error', error);
        return {error: 'Error creating venue'};
    }
    

}

export default createVenue;