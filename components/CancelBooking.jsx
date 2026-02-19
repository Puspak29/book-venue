'use client';
import cancelBooking from "@/app/actions/cancelBooking";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import { Trash2 } from "lucide-react";



function CancelBooking({bookingId}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = async ()=>{
        try {
            await cancelBooking(bookingId);
            toast.success('Booking cancelled successfully');
        } catch (error) {
            // console.log(error);
            toast.error('Failed to cancel booking');
        }
    }

  return (
    <>
    <button
    onClick={() => setIsModalOpen(true)}
    className="bg-red-500 text-white px-5 py-2.5 rounded-xl w-full sm:w-auto text-center hover:bg-red-700 transition-all font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-100"
    >
    <Trash2 size={14}/>Cancel Booking
    </button>
    <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancel}
        title="Cancel Reservation"
        message="Are you sure you want to cancel this booking? This action may be subject to cancellation fees."
      />
    </>
  )
}

export default CancelBooking
