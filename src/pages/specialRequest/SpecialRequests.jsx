import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpecialRequestService from "../../api/specialRequestService";

export default function SpecialRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    SpecialRequestService.getAll().then(setRequests);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Special Requests</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          onClick={() => navigate("/special-requests/new")}
        >
          Add New Request
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-6 py-3 text-left text-sm font-semibold text-gray-700">Booking ID</th>
              <th className="border px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="border px-6 py-3 text-left text-sm font-semibold text-gray-700 ">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No special requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id}>
                  <td className="border px-6 py-4">{req.bookingId}</td>
                  <td className="border px-6 py-4">{req.description}</td>
                  <td className="border px-6 py-4">
                    <button onClick={() => navigate(`/special-requests/edit/${req.id}`)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500">Edit</button>
                    <button onClick={() => navigate(`/special-requests/delete/${req.id}`)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}
