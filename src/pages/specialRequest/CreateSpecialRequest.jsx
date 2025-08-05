import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpecialRequestService from "../../api/specialRequestService";
import {BookingService} from "../../api/bookingService";
import toast from "react-hot-toast";

export default function CreateSpecialRequest() {
  const { id } = useParams(); // ID for edit mode
  const isEdit = !!id;
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      try {
        const bookingData = await BookingService.getAllBookings();
        setBookings(bookingData);
        BookingService.getAllBookings().then(setBookings);
        if (isEdit) {
          SpecialRequestService.getById(id).then(res => {
            setDescription(res.description || "");
            setBookingId(res.bookingId);
          });
        }
      } catch (err) {
        toast.error(err || "Failed to load bookings");
      }
    }
    loadBookings()
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { bookingId: parseInt(bookingId), description };

    try {
      if (isEdit) {
        await SpecialRequestService.update(id, data);
        toast.success("Request updated");
      } else {
        await SpecialRequestService.create(data);
        toast.success("Request added");
      }

      navigate("/special-requests");
    } catch (err) {
      toast.error(err || "Failed to save request");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Special Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Booking</label>
          <select
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select booking</option>
            {bookings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.customerName} (ID: {b.id})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Request Text</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
            {isEdit ? "Update" : "Add"} Request
          </button>
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => navigate("/specialrequests")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
