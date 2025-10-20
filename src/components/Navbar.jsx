import React, { useState } from "react";
import { Bell, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center bg-white shadow px-4 sm:px-6 py-3 border-b border-gray-200">
      {/* Left: Title */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-2xl font-bold text-blue-600 truncate">
          💰 Self Money Manager
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full truncate">
          <User className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-700 truncate">Rahul</span>
        </div>
      </div>
    </nav>
  );
}
