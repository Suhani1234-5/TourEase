import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteIds } = useFavorites();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/destinations', label: 'Explore' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Logo click → home + scroll top
  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ---------------- THEME LOGIC ---------------- */

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Apply theme to html
  const applyTheme = (mode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', mode);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  /* ------------------------------------------------ */

  return (
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
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-teal-500 dark:bg-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Favorites */}
            <Link
              to="/favorites"
              className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${
                isActive('/favorites')
                  ? 'bg-teal-500 dark:bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Heart className="w-5 h-5" />
              Favorites
              {favoriteIds.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 rounded-full">
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
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-500 rotate-0" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 transition-transform duration-500" />
              )}
            </button>

            {/* CTA */}
            <Link
              to="/signup"
              className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>

            {/* MOBILE MENU */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg font-semibold transition ${
                  isActive(item.path)
                    ? 'bg-teal-500 dark:bg-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
