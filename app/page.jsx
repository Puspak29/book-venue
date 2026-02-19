// import rooms from '@/data/rooms.json';
import { Roomcard, Heading } from '@/components';
import getAllVenues from './actions/getAllVenues';

export default async function Home() {
  const rooms = await getAllVenues();

  return (
    <>
      <Heading props="Available Venues" />
      <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <Roomcard key={room.$id} props={room} />
        ))
      ) : (
        <p>No rooms available</p>
      )}
      </div>
      </div>
    </>
  );
}
