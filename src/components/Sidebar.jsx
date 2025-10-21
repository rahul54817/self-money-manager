import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  BarChart2,
  Settings,
  Menu,
  X,
  CreditCard,
  BadgeIndianRupee,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Income", icon: <TrendingUp size={20} />, path: "/income" },
    { name: "Expenses", icon: <Wallet size={20} />, path: "/expense" },
    { name: "Reports", icon: <BarChart2 size={20} />, path: "/reports" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "EMI Tracker", path: "/emi", icon: <CreditCard size={20} /> },
    { name: "Lent/Borrowed", icon: <BadgeIndianRupee size={20} />, path: "/loans" },

  ];

  return (
    <>
      {/* Mobile Navbar toggle */}
      <div className="sm:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200 shadow fixed w-full z-50">
        <button
          className="p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-xl font-bold text-blue-600 truncate">💼 My Finance</h2>
      </div>

      {/* Sidebar Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:inset-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-center sm:justify-center mt-12 sm:mt-0">
          <h2 className="text-2xl font-bold text-blue-600">💼 My Finance</h2>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive ? "bg-blue-100 text-blue-600 shadow-lg" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Optional Footer */}
        <div className="p-6 border-t border-gray-200 hidden sm:block">
          <p className="text-sm text-gray-500 text-center">© 2025 Self Money Manager</p>
        </div>
      </aside>
    </>
  );
}
