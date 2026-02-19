import { Heading, BookedVenueCard } from "@/components";
import getBookings from "../actions/getBookings";
import Link from "next/link";
import { Inbox } from "lucide-react";

async function BookingsPage() {
  const bookings = await getBookings();
  // console.log(bookings);
  return (
    <>
      <Heading props="Bookings" />
      {
        bookings.length > 0 ? (
          bookings.map((booking) => <BookedVenueCard key={`${booking.$id}`} booking={booking} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200 shadow-sm">
            <div className="h-20 w-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mb-4">
              <Inbox size={40} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 font-medium text-center max-w-xs">
              You haven't reserved any spaces. Explore our featured venues to find the perfect spot!
            </p>
            <Link
              href="/" 
              className="mt-8 px-8 py-3 bg-indigo-50 text-indigo-700 font-black rounded-xl hover:bg-indigo-100 transition-all"
            >
              Browse Venues
            </Link>
          </div>
        )
      }
    </>
  )
}

export default BookingsPage;
