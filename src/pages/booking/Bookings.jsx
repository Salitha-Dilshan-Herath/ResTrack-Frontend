import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingService } from "../../api/bookingService";
import { HotelService } from "../../api/hotelService";
import { RoomService } from "../../api/roomService";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [roomMap, setRoomMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const bookingData = await BookingService.getAllBookings();
        setBookings(bookingData);

        const hotelData = await HotelService.getAll();
        setHotels(hotelData);

        const uniqueHotelIds = [...new Set(bookingData.map(b => b.hotelId))];

        const roomResults = await Promise.all(
          uniqueHotelIds.map(async (hotelId) => {
            const rooms = await RoomService.getByHotelId(hotelId);
            return { hotelId, rooms };
          })
        );

        const roomMapObj = {};
        roomResults.forEach(({ hotelId, rooms }) => {
          rooms.forEach((room) => {
            roomMapObj[`${hotelId}_${room.id}`] = room.name || `${room.roomType}`;
          });
        });

        setRoomMap(roomMapObj);
      } catch (err) {
        console.error("Error loading bookings or rooms:", err.message);
      }
    }

    loadData();
  }, []);

  const getHotelName = (hotelId) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    return hotel ? hotel.name : "Unknown";
  };

  const getRoomName = (hotelId, roomId) => {
    return roomMap[`${hotelId}_${roomId}`] || "Unknown";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Booking List</h2>
        <button
          onClick={() => navigate("/bookings/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Booking
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-left">Check-In</th>
              <th className="border px-4 py-2 text-left">Check-Out</th>
              <th className="border px-4 py-2 text-left">Hotel</th>
              <th className="border px-4 py-2 text-left">Room</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.customerName}</td>
                <td className="border px-4 py-2">{new Date(booking.checkInDate).toLocaleString()}</td>
                <td className="border px-4 py-2">{new Date(booking.checkOutDate).toLocaleString()}</td>
                <td className="border px-4 py-2">{getHotelName(booking.hotelId)}</td>
                <td className="border px-4 py-2">{getRoomName(booking.hotelId, booking.roomId)}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/bookings/edit/${booking.id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button 
                  onClick={() => navigate(`/bookings/delete/${booking.id}`)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
