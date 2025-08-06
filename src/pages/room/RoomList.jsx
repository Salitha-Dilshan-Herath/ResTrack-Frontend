import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelService } from "../../api/hotelService";
import { RoomService } from "../../api/roomService";

export default function RoomList() {
  const [hotels, setHotels] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    HotelService.getAll().then(setHotels);
  }, []);

  useEffect(() => {
    if (hotelId) {
      RoomService.getByHotelId(hotelId).then(setRooms);
    }
  }, [hotelId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Room List</h2>
        <button
          onClick={() => navigate(`/rooms/new/${hotelId}`)}
          disabled={!hotelId}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Add New Room
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-medium">Select Hotel:</label>
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">-- Select Hotel --</option>
          {hotels.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>
      </div>

      {hotelId && (
        <table className="table-auto w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Room Type</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id}>
                <td className="border px-2 py-1">{r.roomType}</td>
                <td className="border px-2 py-1">{r.pricePerNight}</td>
                <td className="border px-2 py-1">{r.description}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => navigate(`/rooms/edit/${r.id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/rooms/delete/${r.id}`)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
