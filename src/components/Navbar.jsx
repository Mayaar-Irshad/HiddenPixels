import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">
            HiddenPixels
          </span>
          <span className="ml-2 text-sm text-gray-500 hidden md:inline">
            - Hide secret messages in plain sight
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Steganography Tool
        </div>
      </div>
    </nav>
  );
}