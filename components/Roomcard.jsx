import Link from "next/link"
import Image from "next/image"

function Roomcard({props}) {
  return (
    <div
            className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <Image
                src={`/images/rooms/${props.image}`} // Dynamic image path
                alt={props.name} // Dynamic alt text
                width={400}
                height={100}
                className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
              />
              <div className="space-y-1">
                <h4 className="text-lg font-semibold">{props.name}</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Address:</span> {props.address}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Availability:</span> {props.availability}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Price/Hour:</span> ${props.price_per_hour}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
              <Link
                href={`/venue/${props.$id}`} // Dynamic link
                className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
              >
                View Venue
              </Link>
            </div>
          </div>
  )
}

export default Roomcard
