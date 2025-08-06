import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HotelService } from "../../api/hotelService";
import toast from "react-hot-toast";

export default function HotelForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [hotel, setHotel] = useState({
        hotelName: "",
        hotelAddress: "",
        hotelDescription: "",
    });

    useEffect(() => {
        if (isEdit) {
            HotelService.getById(id)
                .then((data) => {
                    setHotel({
                        hotelName: data.name,
                        hotelAddress: data.address,
                        hotelDescription: data.description,
                    });
                })
                .catch(() => toast.error("Failed to load hotel details"));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await HotelService.update(id, hotel);
                toast.success("Hotel updated successfully");
            } else {
                await HotelService.create(hotel);
                toast.success("Hotel created successfully");
            }
            navigate("/hotels");
        } catch (err) {
            console.error("Error saving hotel:", err);
            toast.error("Failed to save hotel");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Hotel" : "Add New Hotel"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        name="hotelName"
                        value={hotel.hotelName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Address</label>
                    <input
                        type="text"
                        name="hotelAddress"
                        value={hotel.hotelAddress}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="hotelDescription"
                        value={hotel.hotelDescription}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        rows={4}
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/hotels")}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
