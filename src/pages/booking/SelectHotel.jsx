import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {HotelService} from "../../api/hotelService";

export default function SelectHotel() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    HotelService.getAll()
      .then((data) => setHotels(data))
      .catch((err) => console.error("Failed to load hotels:", err.message));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Select a Hotel</h2>

      {hotels.length === 0 ? (
        <p className="text-gray-500">Loading hotels...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="border rounded p-6 text-center shadow-sm">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{hotel.address}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/bookings/new/${hotel.id}`)}
              >
                Book at {hotel.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
