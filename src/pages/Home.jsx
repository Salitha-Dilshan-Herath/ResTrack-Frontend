import FeatureCard from "../components/FeatureCard";
import StatBar from "../components/StatBar";

export default function Home() {
  return (
    <div>
      <div className="bg-gray-700 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Welcome to ResTrack</h1>
        <p className="mt-2">Your complete hotel reservation management solution</p>
        <div className="mt-4 space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Manage Bookings</button>
          <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">View Weekly Schedule</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <FeatureCard title="Booking Management" icon="📅" description="Easily create, edit, and track all your hotel reservations in one place." />
        <FeatureCard title="Availability View" icon="🔍" description="Quickly check room availability with our intuitive weekly calendar." />
        <FeatureCard title="Special Requests" icon="🔔" description="Manage all guest special requests and preferences efficiently." />
      </div>

      <StatBar total={0} active={0} rooms={4} />

      <div className="text-center my-8">
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Create New Booking</button>
      </div>
    </div>
  );
}
