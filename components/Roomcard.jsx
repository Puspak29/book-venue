import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, MapPin, Maximize2, Users, IndianRupeeIcon } from "lucide-react";

function Roomcard({props}) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_VENUE;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imgUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${props.image}/view?project=${projectId}`;

  const imgSrc = props.image ? imgUrl : '/images/no-image.jpg';

  return (
    <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 rounded-2xl overflow-hidden transition-all duration-300 p-4 mt-4">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image Container */}
        <div className="relative w-full sm:w-56 h-48 sm:h-44 shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image 
            src={imgSrc} 
            alt={props.name}
            height={400}
            width={400} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
                {props.name}
              </h4>
              <div className="flex items-center text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl shrink-0">
                <span className="inline-flex items-center text-sm font-black"><IndianRupeeIcon size={14}/>{props.price_per_hour}</span>
                <span className="text-[10px] font-bold ml-1 text-indigo-400">/hr</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 mt-4">
              <div className="flex items-center text-gray-500 gap-2 col-span-2">
                <MapPin size={14} className="text-indigo-500 shrink-0" />
                <span className="text-sm font-medium text-gray-600 line-clamp-1">{props.address}</span>
              </div>
              
              <div className="flex items-center text-gray-400 gap-2">
                <Users size={14} />
                <span className="text-xs font-bold text-gray-600">{props.capacity || '0'} Cap.</span>
              </div>

              <div className="flex items-center text-gray-400 gap-2">
                <Maximize2 size={14} />
                <span className="text-xs font-bold text-gray-600">{props.sqft || '0'} sqft</span>
              </div>

              <div className="flex items-center text-gray-400 gap-2 col-span-2">
                <Clock size={14} className="text-indigo-400 shrink-0" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">{props.availability}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-end">
            <Link
              href={`/venues/${props.$id}`}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-black transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 active:scale-95 group/btn"
            >
              View Details
              <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roomcard
