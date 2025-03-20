import { Heading } from "@/components";
import getMylist from "@/app/actions/getMylist";
import { MyList } from "@/components";

async function MyListPage() {
    const venues = await getMylist();
  return (
    <div>
      <Heading props='Mylist' />
      {venues.length > 0 ? (
        venues.map((venue)=> <MyList key={`${venue.$id}`} props={venue}  /> )
      )
       : (
        <p>No venues</p>
       )}
    </div>
  )
}

export default MyListPage;
