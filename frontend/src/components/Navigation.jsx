import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, Sun, Moon } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../context/ThemeContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds } = useFavorites();
  const isLoggedIn = !!localStorage.getItem("token");

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/destinations", label: "Explore" },
    { path: "/contact", label: "Contact" },
    { path: "/trip-planner", label: "Trip Planner" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };


  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .menu-open {
          animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .menu-close {
          animation: slideOutRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .backdrop-open {
          animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .backdrop-close {
          animation: fadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* LOGO */}
            <span
              onClick={handleLogoClick}
              className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent"
            >
              TourEase
            </span>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${isActive(item.path)
                    ? "bg-teal-500 dark:bg-indigo-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/favorites"
                className={`relative px-4 pr-12 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${isActive("/favorites")
                  ? "bg-teal-500 dark:bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                <Heart className="w-5 h-5" />
                Favorites
                {favoriteIds.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 h-5 min-w-[1.75rem] rounded-full inline-flex items-center justify-center">
                    {favoriteIds.length}
                  </span>
                )}
              </Link>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="
                  p-2 rounded-lg cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  transition-all duration-300 ease-in-out
                  active:scale-95
                "
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-500 rotate-0" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 transition-transform duration-500" />
                )}
              </button>

              {/* CTA */}
              {!isLoggedIn ? (
                /* CHANGED: Points to Trip Planner */
                <Link
                  to="/trip-planner"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition items-center"
                >
                  Get Started
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Logout
                </button>
              )}

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-900 dark:text-white"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU BACKDROP */}
      <div
        className={`
          fixed inset-0 z-30 md:hidden
          bg-black/50 backdrop-blur-sm
          ${isOpen ? "backdrop-open pointer-events-auto" : "backdrop-close pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU DRAWER */}
      <div
        className={`
          fixed inset-y-0 right-0 z-40 md:hidden
          w-72 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700
          ${isOpen ? "menu-open" : "menu-close"}
        `}
      >
        <div className="h-full flex flex-col p-6 space-y-4">
          {/* Header with close button */}
          <div className="flex items-center justify-between py-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-gray-900 dark:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-4 rounded-2xl font-semibold transition-all duration-200 ${isActive(item.path)
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-500 dark:to-purple-600 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                style={{
                  animation: isOpen
                    ? `slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.05 * (index + 1)}s backwards`
                    : "none"
                }}
              >
                {item.label}
              </Link>
            ))}

            {/* Favorites */}
            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className={`relative px-5 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-200 ${isActive("/favorites")
                ? "bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-500 dark:to-purple-600 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              style={{
                animation: isOpen
                  ? `slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards`
                  : "none"
              }}
            >
              <Heart className="w-5 h-5 flex-shrink-0" />
              <span>Favorites</span>
              {favoriteIds.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-bold min-w-[2rem] flex items-center justify-center shadow-lg">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
          </div>

          {/* Fixed bottom CTA */}
          <div
            className="pt-4 border-t border-gray-200 dark:border-gray-700"
            style={{
              animation: isOpen
                ? `slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.35s backwards`
                : "none"
            }}
          >
            {!isLoggedIn ? (
              /* CHANGED: Points to Trip Planner */
              <Link
                to="/trip-planner"
                className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg text-center"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}