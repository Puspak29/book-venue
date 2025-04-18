import { BookingForm, Heading } from "@/components"
// import rooms from "@/data/rooms.json"
import Image from "next/image"
import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"
import getSingleVenue from '@/app/actions/getSingleVenue'

async function page({params}) {

    const { id } = await params
    const room = await getSingleVenue(id)
    if(!room) return <Heading props="Venue not found" />
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_VENUE;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imgUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

    const imgSrc = room.image ? imgUrl : '/images/no-image.jpg';

  return (
    <>
      <Heading props={room.name} />
      <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronLeft className="inline mr-1" />
          <span className="ml-2">Back to Venues</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <Image
            src={imgSrc}
            alt={room.name}
            width={400}
            height={100}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
          />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-4">
              {room.description}
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-gray-800">Size:</span>
                {room.sqft} sqft
              </li>
              <li>
                <span className="font-semibold text-gray-800">Availability:</span>
                {room.availability}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Price/Hour:</span>
                {room.price_per_hour}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Address:</span> 
                {room.address}
              </li>
            </ul>
          </div>
        </div>

        <BookingForm venue={room}/>
      </div>
    </>
  )
}

export default page
