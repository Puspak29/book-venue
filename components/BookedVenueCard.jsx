import Link from "next/link"
import { CancelBooking } from ".";
import { CalendarDays, Eye } from "lucide-react";

function BookedVenueCard({booking}) {

    const { venue_id : venue } = booking;
    
    const dateFormat = (dateString)=>{
        const date = new Date(dateString);
        
        const option = {month: 'short'};
        const month = date.toLocaleString('en-US', option, { timeZone: 'UTC' });

        const day = date.getUTCDate();

        const timeOptions= {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'UTC'
        }

        const time = date.toLocaleString('en-US', timeOptions);

        return `${month} ${day}, ${time}`;
    }

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all hover:shadow-xl hover:shadow-indigo-500/5 group relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-indigo-600" />
          <h4 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
            {venue.name}
          </h4>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-tight flex items-center gap-2">
            <span className="w-20 text-indigo-400">Check In:</span>
            <span className="text-gray-700">{dateFormat(booking.check_in)}</span>
          </p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-tight flex items-center gap-2">
            <span className="w-20 text-indigo-400">Check Out:</span>
            <span className="text-gray-700">{dateFormat(booking.check_out)}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 mt-6 sm:mt-0">
        <Link
          href={`/venues/${venue.$id}`}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl w-full sm:w-auto text-center hover:bg-indigo-700 transition-all font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
        >
          <Eye size={14}/> View Room  
        </Link>
        <CancelBooking bookingId={booking.$id} />
      </div>
    </div>
  )
}

export default BookedVenueCard
