import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import { HotelService } from "../../api/hotelService";
import { RoomService } from "../../api/roomService";
import { BookingService } from "../../api/bookingService";
import toast from 'react-hot-toast';

export default function CreateBooking() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotelName, setHotelName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDaysInterval, setRecurringDaysInterval] = useState(0);
  const [recurringCount, setRecurringCount] = useState(0);


  useEffect(() => {
    async function fetchData() {
      try {
        const hotel = await HotelService.getHotelById(hotelId);
        setHotelName(hotel.name);

        const roomList = await RoomService.getRoomsByHotelId(hotelId);
        setRooms(roomList);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    }

    fetchData();
  }, [hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      customerName,
      checkInDate: checkIn?.toISOString(),
      checkOutDate: checkOut?.toISOString(),
      hotelId: parseInt(hotelId),
      roomId: parseInt(roomId),
      isRecurring,
      recurringDaysInterval: isRecurring ? parseInt(recurringDaysInterval) : 0,
      recurringCount: isRecurring ? parseInt(recurringCount) : 0,
    };

    try {
      await BookingService.createBooking(data);
      toast.success("Booking created successfully!");
      navigate("/bookings");
    } catch (err) {
      toast.error(err.message || "Booking failed");
    }

  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Create Booking at {hotelName}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Room</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomType}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Check-In</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Check-Out</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
          <label className="text-sm font-medium">Is Recurring</label>
        </div>

        {isRecurring && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Days Interval</label>
              <input
                type="number"
                min="1"
                value={recurringDaysInterval}
                onChange={(e) => setRecurringDaysInterval(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Repeat Count</label>
              <input
                type="number"
                min="1"
                value={recurringCount}
                onChange={(e) => setRecurringCount(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}