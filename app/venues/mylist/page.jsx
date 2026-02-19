import { Heading } from "@/components";
import getMylist from "@/app/actions/getMylist";
import { MyList } from "@/components";
import { Building2, PlusCircle } from "lucide-react";
import Link from "next/link";

async function MyListPage() {
    const venues = await getMylist();
  return (
    <>
      <Heading props='Mylist' />
      {venues.length > 0 ? (
        venues.map((venue)=> <MyList key={`${venue.$id}`} props={venue}  /> )
      )
       : (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm">
          <div className="h-24 w-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-200 mb-6">
            <Building2 size={48} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Your List is Empty</h3>
          <p className="text-gray-400 font-bold text-center max-w-xs uppercase text-xs tracking-widest leading-loose">You haven't listed any venues yet. Start earning by registering your space.</p>
          <Link 
            href="/venues/add"
            className="mt-10 px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 flex items-center gap-3"
          >
            <PlusCircle size={20} /> List Your First Venue
          </Link>
        </div>
       )}
    </>
  )
}

export default MyListPage;
