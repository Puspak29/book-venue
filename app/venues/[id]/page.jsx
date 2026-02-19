import { BookingForm, Heading } from "@/components"
// import rooms from "@/data/rooms.json"
import Image from "next/image"
import Link from "next/link"
import getSingleVenue from '@/app/actions/getSingleVenue'
import { ChevronLeft, IndianRupeeIcon } from "lucide-react"

async function page({params}) {

    const { id } = await params
    const room = await getSingleVenue(id)
    if(!room) return <Heading props="Venue not found" />
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_VENUE;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imgUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

    const imgSrc = room.image ? imgUrl : '/images/no-image.jpg';

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Heading props={room.name} />
      
      <div className="bg-white shadow-xl rounded-[2rem] border border-gray-100 p-6 lg:p-10 transition-all">
        {/* Back Link */}
        <Link
          href='/'
          className="flex items-center text-gray-500 hover:text-indigo-600 mb-8 font-bold transition-colors group"
        >
          <ChevronLeft className="inline mr-1 transition-transform group-hover:-translate-x-1" size={20} />
          <span className="ml-1">Back to Venues</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-10">
          {/* Main Image */}
          <div className="w-full sm:w-1/3 h-80 sm:h-auto overflow-hidden rounded-2xl shadow-inner bg-gray-50">
            <Image
              src={imgSrc}
              alt={room.name}
              width={400}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Area */}
          <div className="mt-8 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {room.description || "A premium space curated for excellence and comfort. Perfect for your next event."}
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-baseline text-gray-700">
                <span className="font-black text-indigo-900 w-32 shrink-0 uppercase text-xs tracking-widest">Size:</span>
                <span className="font-medium">{room.sqft} sqft</span>
              </li>
              <li className="flex items-baseline text-gray-700">
                <span className="font-black text-indigo-900 w-32 shrink-0 uppercase text-xs tracking-widest">Capacity:</span>
                <span className="font-medium">{room.capacity} Guests</span>
              </li>
              <li className="flex items-baseline text-gray-700">
                <span className="font-black text-indigo-900 w-32 shrink-0 uppercase text-xs tracking-widest">Availability:</span>
                <span className="font-medium">{room.availability}</span>
              </li>
              <li className="flex items-baseline text-gray-700">
                <span className="font-black text-indigo-900 w-32 shrink-0 uppercase text-xs tracking-widest">Price/Hour:</span>
                <span className="inline-flex items-center font-bold text-indigo-600"><IndianRupeeIcon size={16} />{room.price_per_hour}</span>
              </li>
              <li className="flex items-baseline text-gray-700">
                <span className="font-black text-indigo-900 w-32 shrink-0 uppercase text-xs tracking-widest">Address:</span> 
                <span className="font-medium">{room.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Booking Form Integration */}
        <div className="mt-10 border-t border-gray-50 pt-4">
          <BookingForm venue={room}/>
        </div>
      </div>
    </div>
  )
}

export default page
