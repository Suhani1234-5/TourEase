import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { favoriteIds } = useFavorites();
    const isLoggedIn = !!localStorage.getItem("token");
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/destinations', label: 'Explore' },
        { path: '/contact', label: 'Contact' }
    ];

    const isActive = (path) => location.pathname === path;

    // Logo Click Handler → Redirect + Scroll to Top
    const handleLogoClick = () => {
        navigate("/");
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };


    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Updated Logo (click to go home + scroll top) */}
                    <span
                        onClick={handleLogoClick}
                        className="flex items-center cursor-pointer"
                    >
                        <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                            TourEase
                        </span>
                    </span>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${isActive(item.path)
                                    ? 'bg-teal-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Favorites Link */}
                        <Link
                            to="/favorites"
                            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${isActive('/favorites')
                                ? 'bg-teal-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >

                            <span>Favorites</span>
                            {favoriteIds.length > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                                    {favoriteIds.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* CTA Button LogOut Button*/}
                    <div className="hidden md:flex">
                        {!isLoggedIn ? (
                            <Link
                                to="/login"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
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
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2 rounded-lg font-semibold transition ${isActive(item.path)
                                    ? 'bg-teal-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Mobile Favorites Link */}
                        <Link
                            to="/favorites"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive('/favorites')
                                ? 'bg-teal-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${favoriteIds.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                            <span>Favorites</span>
                            {favoriteIds.length > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                                    {favoriteIds.length}
                                </span>
                            )}
                        </Link>

                        {!isLoggedIn ? (
                            <Link
                                to="/login"
                                className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition text-center"
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
                                className="block w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition text-center"
                            >
                                Logout
                            </button>
                        )}

                    </div>
                )}
            </div>
        </nav>
    );
}
