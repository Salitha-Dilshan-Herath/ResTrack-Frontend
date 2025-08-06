import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HotelService } from "../../api/hotelService";

export default function HotelList() {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            try {

                const hotelData = await HotelService.getAll();
                setHotels(hotelData);
            } catch (err) {
                console.error("Error loading hotel:", err.message);
            }
        }

        loadData();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Hotel List</h2>
                <button
                    onClick={() => navigate("/hotels/new")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add New Hotel
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-200 text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-4 p-2">Name</th>
                            <th className="border px-4 p-2">Address</th>
                            <th className="border px-4 p-2 w-[300px]">Description</th>
                            <th className="border px-4 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel.id}>
                                <td className="border px-4 p-2">{hotel.name}</td>
                                <td className="border px-4 p-2">{hotel.address}</td>
                                <td className="border px-4 p-2 break-words w-[300px] max-w-[300px]">{hotel.description}</td>
                                <td className="border px-4 p-2">
                                    <button
                                        onClick={() => navigate(`/hotels/edit/${hotel.id}`)}
                                        className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => navigate(`/hotels/delete/${hotel.id}`)} className="bg-red-500 text-white px-3 py-1 rounded">
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
