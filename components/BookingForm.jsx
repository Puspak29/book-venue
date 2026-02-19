'use client';

import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import bookVenue from "@/app/actions/bookVenue";
import { Calendar } from "lucide-react";

function BookingForm({ venue }) {
  const [state, formAction] = useActionState( bookVenue, {});
  const router = useRouter();

  useEffect(()=>{
    if(state.error) toast.error(state.error);
    if(state.success){
      toast.success('Venue booked successfully');
      router.push('/bookings');
    }
  },[state]);

  const labelStyle = "text-xs font-black text-indigo-400 uppercase ml-1 mb-1 block tracking-wider";
  const inputStyle = "w-full bg-white border border-indigo-100 rounded-xl px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium";

  return (
    <div className="mt-8 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
      <h5 className="text-lg font-black text-indigo-900 mb-6 flex items-center gap-2">
        <Calendar size={20} className="text-indigo-600" /> Reserve this Space
      </h5>
      
      <form action={formAction} className="mt-4">
        <input type="hidden" name="venue_id" value={venue?.$id} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="check_in_date" className={labelStyle}>Check-In Date</label>
              <input 
                type="date" 
                id="check_in_date"
                name="check_in_date"
                className={inputStyle} 
                required
              />
            </div>
            <div>
              <label htmlFor="check_in_time" className={labelStyle}>Check-In Time</label>
              <input 
                type="time" 
                id="check_in_time"
                name="check_in_time"
                className={inputStyle} 
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="check_out_date" className={labelStyle}>Check-Out Date</label>
              <input 
                type="date" 
                id="check_out_date"
                name="check_out_date"
                className={inputStyle} 
                required
              />
            </div>
            <div>
              <label htmlFor="check_out_time" className={labelStyle}>Check-Out Time</label>
              <input 
                type="time" 
                id="check_out_time"
                name="check_out_time"
                className={inputStyle} 
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-indigo-100">
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            Confirm Reservation Request
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
