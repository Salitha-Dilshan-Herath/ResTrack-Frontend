import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomService } from "../../api/roomService";
import toast from "react-hot-toast";

export default function RoomDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    RoomService.getById(id).then(setRoom);
  }, [id]);

  const handleDelete = async () => {
    try {
      await RoomService.delete(id);
      toast.success("Room deleted.");
      navigate("/rooms");
    } catch {
      toast.error("Failed to delete room.");
    }
  };

  if (!room) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Confirm Delete</h2>
      <p className="mb-4">
        Are you sure you want to delete <strong>{room.roomType}</strong> from this hotel?
      </p>
      <div className="flex space-x-4">
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
        <button onClick={() => navigate("/rooms")} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}
