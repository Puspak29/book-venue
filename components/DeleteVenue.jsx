'use client';
import { toast } from "react-toastify";
import deleteVenue from "@/app/actions/deleteVenue";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function DeleteVenue(venueId) {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
      try {
        const response = await deleteVenue(venueId);
        toast.success('Venue deleted successfully');
      } catch (error) {
        // console.log(error);
        toast.error('Failed to delete venue');
      }
    }

  return (
    <>
    <button
    onClick={() => setIsModalOpen(true)}
    className="bg-red-500 text-white px-4 py-2 rounded-xl mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-bold text-sm"
    >
        <Trash2 size={16}/> Delete
    </button>
    <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Venue"
        message="Are you sure you want to delete this venue? This action cannot be undone."
    />
    </>
  )
}

export default DeleteVenue;
