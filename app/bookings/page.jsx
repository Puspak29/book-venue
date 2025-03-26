import { Heading, BookedVenueCard } from "@/components";
import getBookings from "../actions/getBookings";

async function BookingsPage() {
  const bookings = await getBookings();
  // console.log(bookings);
  return (
    <div>
      <Heading props="Bookings" />
      {
        bookings.length > 0 ? (
          bookings.map((booking) => <BookedVenueCard key={`${booking.$id}`} booking={booking} />)
        ) : (
          <p>No bookings</p>
        )
      }
    </div>
  )
}

export default BookingsPage;
