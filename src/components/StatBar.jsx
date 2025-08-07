export default function StatBar({ total, active }) {
  return (
    <div className="bg-blue-600 text-white flex justify-around py-4 text-center font-medium">
      <div>
        <div className="text-xl">{total}</div>
        <div>Total Bookings</div>
      </div>
      <div>
        <div className="text-xl">{active}</div>
        <div>Active Stays</div>
      </div>
    </div>
  );
}
