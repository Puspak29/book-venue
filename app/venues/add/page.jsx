'use client';

import { Heading } from "@/components";
import { useEffect, useActionState, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createVenue from "@/app/actions/createVenue";
import { CheckCircle2, Clock, MapPin, Maximize2, Upload, Users, Map, Info, IndianRupeeIcon } from "lucide-react";


function AddVenuePage() {
    const [state, formAction] = useActionState(createVenue, {});
    const [dragActive, setDragActive] = useState(false);
    const router = useRouter();
    const formRef = useRef(null);

    useEffect(()=>{
        if(state.error) toast.error(state.error);
        if(state.success){
            toast.success('Venue added successfully');
            router.push('/');
        }
    },[state]);

    const handleDiscard = () => {
      if (formRef.current) {
        formRef.current.reset();
        toast.info('Form reset successfully');
      }
    };

  const inputClasses = "block w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-sm outline-none border";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2 ml-1";

  return (
    <>
      <Heading props="Add Venue" />
      <div className="bg-white shadow-lg rounded-3xl p-6 w-full">
        <div className="px-8 py-4 flex items-center justify-between">
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Info size={14} /> Venue Specifications
          </p>
        </div>
        <form ref={formRef} className="p-8 space-y-8" action={formAction}>
          {/* Section 1: Identity */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className={labelClasses}>Venue Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                placeholder="e.g. Creative Collective Loft" 
                className={inputClasses} 
                required 
              />
            </div>
            <div>
              <label htmlFor="description" className={labelClasses}>Description</label>
              <textarea 
                id="description"
                name="description" 
                rows={4} 
                placeholder="Describe what makes this space unique..." 
                className={inputClasses} 
                required 
              ></textarea>
            </div>
          </div>

          {/* Section 2: Specs & Pricing - Mapping: sqft, capacity, price_per_hour */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="sqft" className={labelClasses}>Square Feet</label>
              <div className="relative">
                <Maximize2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="number" id="sqft" name="sqft" placeholder="2500" className={`${inputClasses} pl-10`} required />
              </div>
            </div>
            <div>
              <label htmlFor="capacity" className={labelClasses}>Capacity</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="number" id="capacity" name="capacity" placeholder="50" className={`${inputClasses} pl-10`} required />
              </div>
            </div>
            <div>
              <label htmlFor="price_per_hour" className={labelClasses}>Price / Hour</label>
              <div className="relative">
                <IndianRupeeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="number" id="price_per_hour" name="price_per_hour" placeholder="1200" className={`${inputClasses} pl-10`} required />
              </div>
            </div>
          </div>

          {/* Section 3: Location Details - Mapping: address, location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
            <div>
              <label htmlFor="address" className={labelClasses}>Full Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" id="address" name="address" placeholder="123 Gallery Row, Arts District" className={`${inputClasses} pl-10`} required />
              </div>
            </div>
            <div>
              <label htmlFor="location" className={labelClasses}>Specific Location</label>
              <div className="relative">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" id="location" name="location" placeholder="Building B, Floor 4, Suite 402" className={`${inputClasses} pl-10`} required />
              </div>
            </div>
          </div>

          {/* Section 4: Operations - Mapping: availability, amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="availability" className={labelClasses}>Availability</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" id="availability" name="availability" placeholder="Mon - Fri, 9am - 6pm" className={`${inputClasses} pl-10`} required />
              </div>
            </div>
            <div>
              <label htmlFor="amenities" className={labelClasses}>Amenities (CSV)</label>
              <input type="text" id="amenities" name="amenities" placeholder="Wifi, Projector, Coffee, Kitchen" className={inputClasses} required />
            </div>
          </div>

          {/* Section 5: Media - Mapping: image */}
          <div className="pt-4">
            <label className={labelClasses}>Venue Image</label>
            <div 
              className={`relative border-2 border-dashed rounded-2xl p-10 transition-all flex flex-col items-center justify-center gap-3 ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-indigo-300'}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
            >
              <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-900">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
              </div>
              <input type="file" id="image" name="image" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-base font-black shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} />
              Publish Venue
            </button>
            <button
              type="button"
              className="px-8 py-4 rounded-2xl text-base font-bold text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={handleDiscard}
            >
              Discard Draft
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddVenuePage;
