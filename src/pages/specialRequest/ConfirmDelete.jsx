import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SpecialRequestService from "../../api/specialRequestService";

export default function SpecialConfirmDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    SpecialRequestService.getById(id).then(setRequest);
  }, [id]);

  const handleDelete = async () => {
    await SpecialRequestService.delete(id);
    toast.success("Deleted successfully");
    navigate("/specialrequests");
  };

  if (!request) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-red-600 text-2xl font-bold mb-4">Confirm Delete</h2>
      <p className="bg-yellow-100 p-4 rounded mb-4">
        Are you sure you want to delete the special request for <strong>{request.customerName}</strong>?
      </p>
      <div className="space-x-2">
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        <button onClick={() => navigate("/specialrequests")} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
}
