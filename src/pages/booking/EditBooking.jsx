import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BookingService } from "../../api/bookingService";
import { RoomService } from "../../api/roomService";
import { toLocalISOString } from "../../utils/dateUtils"; 
import toast from "react-hot-toast";

export default function EditBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function loadBooking() {
      try {
        const booking = await BookingService.getBookingById(bookingId);
        setCustomerName(booking.customerName);
        setCheckIn(new Date(booking.checkInDate));
        setCheckOut(new Date(booking.checkOutDate));
        setRoomId(booking.roomId);

        const roomList = await RoomService.getByHotelId(booking.hotelId);
        setRooms(roomList);
      } catch (err) {
        toast.error(err.message || "Failed to load booking");
      }
    }

    loadBooking();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      customerName,
      checkInDate: toLocalISOString(checkIn),
      checkOutDate: toLocalISOString(checkOut),
      roomId: parseInt(roomId),
    };

    try {
      await BookingService.updateBooking(bookingId, updateData);
      toast.success("Booking updated successfully!");
      navigate("/bookings");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name || `${room.roomType}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-In
            </label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd h:mm aa"
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-Out
            </label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd h:mm aa"
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
