import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomService } from "../../api/roomService";
import toast from "react-hot-toast";

export default function RoomForm() {
  const { id, hotelId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    roomType: "",
    pricePerNight: 0,
    description: "",
    hotelId: hotelId || "",
  });

  useEffect(() => {
    if (isEdit) {
      RoomService.getById(id).then((data) => setForm(data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await RoomService.update(id, form);
        toast.success("Room updated!");
      } else {
        await RoomService.create({ ...form, hotelId: parseInt(hotelId) });
        toast.success("Room created!");
      }
      navigate("/rooms");
    } catch (err) {
      toast.error(err || "Failed to save room");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="roomType"
          placeholder="Room Type"
          value={form.roomType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Price per Night"
          value={form.pricePerNight}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/rooms")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
