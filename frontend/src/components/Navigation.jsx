import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, Sun, Moon, Globe, MapPin } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../context/useTheme";
import LanguageSelector from "./LanguageSelector";

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
    { path: "/smart-trip-planner", label: "Smart Planner" },
    { path: "/split-expense", label: "Expense Splitter" },
    { path: "/currency-converter", label: "Currency" },
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

      <nav className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 bg-gradient-to-b from-teal-50/50 to-transparent dark:from-gray-800/50 shadow-md border-b border-gray-200 dark:border-gray-800">
        
        {/* Outer Container: Uses clamp to reduce side padding on medium screens to buy more space */}
        <div className="w-full px-[clamp(16px,2vw,48px)]">
          
          <div className="flex h-20 items-center justify-between w-full">
            
            {/* LOGO */}
            <div
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center gap-2 group shrink-0"
            >
              <div className="relative flex items-center justify-center w-8 h-8">
                <Globe className="w-8 h-8 text-teal-600 dark:text-cyan-400 group-hover:rotate-180 transition-transform duration-700" strokeWidth={1.5} />
                <MapPin className="w-4 h-4 text-orange-500 absolute -top-1 -right-1 fill-orange-100 dark:fill-orange-900" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-teal-500 to-cyan-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                TourEase
              </span>
            </div>

            {/* DESKTOP NAV (Breaks exactly at 1200px, but shrinks dynamically before that) */}
            <div className="hidden min-[1200px]:flex items-center gap-[clamp(4px,0.8vw,8px)] flex-1 justify-center px-2">
              {navItems.map((item, index) => {
                const hoverColors = [
                  "hover:bg-cyan-100 dark:hover:bg-cyan-900/30",
                  "hover:bg-blue-100 dark:hover:bg-blue-900/30",
                  "hover:bg-purple-100 dark:hover:bg-purple-900/30",
                  "hover:bg-pink-100 dark:hover:bg-pink-900/30",
                  "hover:bg-orange-100 dark:hover:bg-orange-900/30",
                  "hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
                  "hover:bg-violet-100 dark:hover:bg-violet-900/30",
                  "hover:bg-amber-100 dark:hover:bg-amber-900/30",
                ];
                const isSecondaryDesktopItem = index >= 5;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-[clamp(6px,0.8vw,12px)] py-2 rounded-lg font-semibold whitespace-nowrap text-[clamp(12px,1vw,15px)] transition-all ${isActive(item.path)
                      ? "bg-teal-500 dark:bg-indigo-600 text-white"
                      : `text-gray-700 dark:text-gray-300 ${hoverColors[index]}`
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/favorites"
                className={`group relative px-[clamp(6px,0.8vw,12px)] py-2 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap text-[clamp(12px,1vw,15px)] transition ${isActive("/favorites")
                  ? "bg-teal-500 dark:bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30"
                  }`}
              >
                <Heart className="w-5 h-5 transition-colors group-hover:text-red-500 group-hover:fill-red-500 shrink-0" />
                Favorites
                {favoriteIds.length > 0 && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 h-5 min-w-7 rounded-full inline-flex items-center justify-center">
                    {favoriteIds.length}
                  </span>
                )}
              </Link>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-[clamp(8px,1vw,16px)] shrink-0">
              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="
                  p-2 rounded-lg cursor-pointer
                  hover:bg-yellow-100 dark:hover:bg-yellow-900/30
                  transition-all duration-300 ease-in-out
                  active:scale-95"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-gray-700 transition-transform duration-500" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-500 rotate-0" />
                )}
              </button>

              <LanguageSelector
                variant="inline"
                className="hidden min-[1200px]:block"
              />


              {/* CTA - Uses clamp to shrink padding and text proportionally */}
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-[clamp(12px,1.5vw,24px)] py-2 rounded-lg font-semibold transition items-center whitespace-nowrap text-[clamp(12px,1vw,15px)]"
                >
                  Get Started
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-[clamp(12px,1.5vw,20px)] py-2 rounded-lg font-semibold transition whitespace-nowrap text-[clamp(12px,1vw,15px)] shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              )}

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="min-[1200px]:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-900 dark:text-white"
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
          fixed inset-0 z-30 min-[1200px]:hidden
          bg-black/50 backdrop-blur-sm
          ${isOpen ? "backdrop-open pointer-events-auto" : "backdrop-close pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU DRAWER */}
      <div
        className={`
          fixed inset-y-0 right-0 z-40 min-[1200px]:hidden
          w-72 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700
          ${isOpen ? "menu-open" : "menu-close"}
        `}
      >
        <div className="h-full flex flex-col p-6 space-y-4">
          {/* Header with close button */}
          <div className="flex items-center justify-between py-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 text-gray-900 dark:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {navItems.map((item, index) => {
              const mobileHoverColors = [
                "hover:bg-cyan-100 dark:hover:bg-cyan-900/40",
                "hover:bg-blue-100 dark:hover:bg-blue-900/40",
                "hover:bg-purple-100 dark:hover:bg-purple-900/40",
                "hover:bg-pink-100 dark:hover:bg-pink-900/40",
                "hover:bg-orange-100 dark:hover:bg-orange-900/40",
                "hover:bg-indigo-100 dark:hover:bg-indigo-900/40",
                "hover:bg-violet-100 dark:hover:bg-violet-900/40",
                "hover:bg-amber-100 dark:hover:bg-amber-900/40",
              ];
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200 ${isActive(item.path)
                    ? "bg-linear-to-r from-teal-500 to-cyan-600 dark:from-indigo-500 dark:to-purple-600 text-white shadow-lg"
                    : `text-gray-700 dark:text-gray-100 ${mobileHoverColors[index]}`
                    }`}
                  style={{
                    animation: isOpen
                      ? `slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.05 * (index + 1)}s backwards`
                      : "none",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-2 xl:hidden">
              <LanguageSelector variant="inline" className="w-full" />
            </div>

            {/* Favorites */}
            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className={`group relative px-5 py-4 rounded-2xl font-semibold flex items-center gap-3 text-[15px] transition-all duration-200 ${isActive("/favorites")
                ? "bg-linear-to-r from-teal-500 to-cyan-600 dark:from-indigo-500 dark:to-purple-600 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-100 hover:bg-red-100 dark:hover:bg-red-900/40"
                }`}
              style={{
              
                animation: isOpen
                  ? `slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards`
                  : "none",
              }}
            >
              <Heart className="w-5 h-5 shrink-0 transition-colors group-hover:text-red-500 group-hover:fill-red-500" />
              <span>Favorites</span>
              {favoriteIds.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-bold min-w-8 flex items-center justify-center shadow-lg">
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
                : "none",
            }}
          >
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="block w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg text-center"
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
                className="block w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg text-center"
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
