'use client';
import cancelBooking from "@/app/actions/cancelBooking";
import { toast } from "react-toastify";



function CancelBooking({bookingId}) {
    const handleCancel = async ()=>{
        const confirmed = window.confirm('Are you sure you want to cancel this booking?');
        if(confirmed){
            try {
                await cancelBooking(bookingId);
                toast.success('Booking cancelled successfully');
            } catch (error) {
                console.log(error);
                toast.error('Failed to cancel booking');
            }
        }
    }

  return (
    <button
    onClick={handleCancel}
    className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
    Cancel Booking
    </button>
  )
}

export default CancelBooking
