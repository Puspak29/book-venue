import Link from "next/link"
import { CancelBooking } from ".";

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
    <div
        className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h4 className="text-lg font-semibold">{venue.name}</h4>
          <p className="text-sm text-gray-600">
            <strong>Check In:</strong>{dateFormat(booking.check_in)}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Check Out:</strong>{dateFormat(booking.check_out)}
          </p>
        </div>
        <div
          className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0"
        >
          <Link
            href={`/venues/${venue.$id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
          >
            View Room
          </Link>
          <CancelBooking bookingId={booking.$id} />
        </div>
      </div>
  )
}

export default BookedVenueCard
