'use client';
import { toast } from "react-toastify";
import deleteVenue from "@/app/actions/deleteVenue";
import { FaTrash } from "react-icons/fa";

function DeleteVenue(venueId) {

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this venue?');
        if(confirmed){
          try {
            const response = await deleteVenue(venueId);
            toast.success('Venue deleted successfully');
          } catch (error) {
            console.log(error);
            toast.error('Failed to delete venue');
          }
        }
      }

  return (
    <button
    onClick={handleDelete}
    className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
        <FaTrash/> Delete
    </button>
  )
}

export default DeleteVenue;
