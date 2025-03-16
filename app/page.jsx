// import rooms from '@/data/rooms.json';
import { Roomcard, Heading } from '@/components';
import getAllVenues from './actions/getAllVenues';

export default async function Home() {
  const rooms = await getAllVenues();

  return (
    <>
      <Heading props="Available Venues" />
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <Roomcard key={room.$id} props={room} />
        ))
      ) : (
        <p>No rooms available</p>
      )}
    </>
  );
}
