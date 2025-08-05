import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookingService } from "../../api/bookingService";
import toast from "react-hot-toast";

export default function ConfirmDelete() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await BookingService.getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
       toast.error(err || "Failed to delete booking");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleDelete = async () => {
    try {
      await BookingService.deleteBooking(bookingId);
      toast.success("Booking deleted successfully!");
      navigate("/bookings");
    } catch (err) {
      toast.error(err || "Failed to delete booking");
    }
  };

  if (!booking) {
  return (
    <div className="text-center mt-20 text-gray-600 text-lg">
      Loading booking details...
    </div>
  );
}

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-red-600 text-2xl font-bold mb-4">Confirm Delete</h2>
      <div className="bg-yellow-100 p-4 rounded mb-6">
        Are you sure you want to delete this booking for <strong>{booking.customerName}</strong>?
      </div>
      <ul className="mb-6">
        <li><strong>Room:</strong> {booking.roomId}</li>
        <li><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</li>
        <li><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</li>
      </ul>
      <div className="flex space-x-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/bookings")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
