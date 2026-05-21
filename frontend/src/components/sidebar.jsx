import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  MapPinned,
  Phone,
  Star,
  Plane,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "About", path: "/about", icon: <Info size={20} /> },
    { name: "Features", path: "/features", icon: <Star size={20} /> },
    {
      name: "Destinations",
      path: "/destinations",
      icon: <MapPinned size={20} />,
    },
    { name: "Plan Trip", path: "/plan-trip", icon: <Plane size={20} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={20} /> },
    { name: "Privacy", path: "/privacy", icon: <Shield size={20} /> },
    { name: "Terms", path: "/terms", icon: <FileText size={20} /> },
    { name: "Help", path: "/help", icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50
          w-64
          bg-[#071120]/95
          backdrop-blur-md
          text-white
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-blue-400">
            TourEase
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 p-4 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-4 px-4 py-3 rounded-xl
                transition-all duration-300
                hover:bg-blue-600
                hover:scale-[1.02]
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300"
                }
              `
              }
            >
              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;