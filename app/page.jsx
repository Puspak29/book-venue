import rooms from '@/data/rooms.json';
import { Roomcard, Heading } from '@/components';

export default function Home() {
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
