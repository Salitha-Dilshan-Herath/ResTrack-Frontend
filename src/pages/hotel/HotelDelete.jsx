import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelService } from "../../api/hotelService";

export default function HotelDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState();

  useEffect(() => {
    HotelService.getById(id).then(setHotel);
  }, [id]);

  const handleDelete = async () => {
    await HotelService.delete(id);
    navigate("/hotels");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      {hotel && (
        <div>
          <p>Are you sure you want to delete the hotel <strong>{hotel.name}</strong>?</p>
          <div className="mt-4 space-x-2">
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            <button onClick={() => navigate("/hotels")} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
