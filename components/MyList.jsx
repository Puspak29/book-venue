import Link from "next/link"
import { DeleteVenue } from "@/components"
import { Eye, MapPin } from "lucide-react"



function MyList({props}) {

  return (
    <div className="group relative bg-white shadow-sm border border-gray-100 rounded-2xl p-5 mt-4 flex flex-col sm:flex-row justify-between items-center transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5">
      {/* Visual Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col mb-4 sm:mb-0 text-center sm:text-left">
        <h4 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
          {props.name}
        </h4>
        <div className="flex items-center gap-1.5 mt-1 justify-center sm:justify-start">
          <span className="inline-flex items-center text-xs font-bold text-gray-500 uppercase tracking-tight"><MapPin size={12}/>{props.address}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
        <Link
          href={`/venues/${props.$id}`}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-black transition-all duration-200 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95 w-full sm:w-auto"
        >
          <Eye size={18}/>
          <span>View Listing</span>
        </Link>

        <DeleteVenue venueId={props.$id}/>
      </div>
    </div>
  )
}

export default MyList
