import rooms from '@/data/rooms.json';
import { Roomcard } from '@/components';

export default function Home() {
  return (
    <>
      <section className="bg-white mb-5 shadow px-4 py-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Available Venues
        </h1>
      </section>

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
