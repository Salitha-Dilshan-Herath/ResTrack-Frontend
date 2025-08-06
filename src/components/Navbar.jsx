import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm w-full">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">ResTrack</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-800">
          <Link to="/bookings" className="hover:underline">Bookings</Link>
          <Link to="/weekly-view" className="hover:underline">Weekly View</Link>
          <Link to="/special-requests" className="hover:underline">Special Requests</Link>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:underline focus:outline-none"
            >
              Management ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                <Link
                  to="/hotels"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Hotels
                </Link>
                <Link
                  to="/rooms"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Rooms
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
