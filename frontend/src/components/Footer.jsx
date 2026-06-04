import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Instagram,
  Linkedin,
  X,
  Youtube,
  Facebook,
} from "lucide-react";

export default function Footer() {
  return (
<footer className="bg-gradient-to-br from-slate-50 via-white to-teal-50 text-gray-600 dark:from-[#020617] dark:via-[#0b1120] dark:to-[#111827] dark:text-gray-400 py-16 relative overflow-hidden border-t border-gray-200 dark:border-transparent">
  <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"></div>

<div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl dark:bg-orange-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-teal-500/40 to-transparent dark:via-orange-500/40"></div>
    <footer className="bg-gray-50 text-gray-600 dark:bg-[#0b1120] dark:text-gray-400 py-16 relative overflow-hidden border-t border-gray-200 dark:border-transparent">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-teal-500/40 to-transparent dark:via-orange-500/40"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
<h3 className="text-gray-900 dark:text-white font-bold text-3xl tracking-tight transition-all duration-300 hover:scale-105 cursor-pointer">
                Tour<span className="text-teal-600 dark:text-teal-400">Ease</span>

            <h3 className="text-gray-900 dark:text-white font-bold text-3xl tracking-tight">
              Tour
              <span className="text-teal-600 dark:text-indigo-600">Ease</span>
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Smart travel companion for unforgettable adventures.
            </p>

            <div className="space-y-2 text-sm">
              <p className="text-gray-800 dark:text-gray-300 font-medium">
                support@tourease.com
              </p>

              <p className="text-gray-500 text-xs uppercase tracking-widest">
                San Francisco, CA, USA
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center flex-wrap gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-teal-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-teal-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-gray-500 hover:text-teal-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-500 hover:text-teal-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-500 hover:text-teal-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-7 text-[12px] uppercase tracking-[0.2em]">
                Product
              </h4>

              <ul className="space-y-4">
                <FooterLink to="/features" label="Features" />
                <FooterLink to="/destinations" label="Destinations" />
                <FooterLink to="/plan-trip" label="Plan Trip" />
                <FooterLink to="/trip-planner" label="Trip Planner" />
                <FooterLink to="/smart-planner" label="Smart Planner" />
                <FooterLink to="/split-expense" label="Expense splitter" />
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-7 text-[12px] uppercase tracking-[0.2em]">
                Company
              </h4>

              <ul className="space-y-4">
                <FooterLink to="/about" label="About Us" />
                <FooterLink to="/destinations" label="Explore" />
                <FooterLink to="/contact" label="Contact" />
                <FooterLink to="/contributors" label="Contributors" />
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-7 text-[12px] uppercase tracking-[0.2em]">
                Support
              </h4>

              <ul className="space-y-4">
                <FooterLink to="/favourites" label="Favourites" />
                <FooterLink to="/login" label="Getting Started" />
                <FooterLink to="/privacy" label="Privacy" />
                <FooterLink to="/terms" label="Terms" />
                <FooterLink to="/help" label="Help" />
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-gray-900 dark:text-white font-bold text-[12px] uppercase tracking-[0.2em]">
              Newsletter
            </h4>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/80 backdrop-blur-sm dark:bg-[#111827]/80 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-teal-500 dark:focus:border-orange-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-orange-500/20 transition-all outline-none"
              />

              <Link
                to="/signup"
                className="block w-full text-center bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 dark:from-orange-600 dark:to-orange-500 dark:hover:from-orange-500 dark:hover:to-orange-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal-500/25 dark:shadow-orange-900/40 active:scale-95 text-sm uppercase tracking-wider"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-[0.25em]">
          <p>&copy; 2026 TourEase. All rights reserved.</p>

          <div className="flex items-center">
            Handcrafted with{" "}
            <Heart className="text-orange-500 w-4 h-4 mx-1 fill-orange-500 animate-pulse" />{" "}
            globally
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <li className="group flex items-center transition-all duration-300 hover:translate-x-1">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-orange-500 mr-3 opacity-70 group-hover:opacity-100 transition-all"></span>

      <Link
        to={to}
        className="text-sm text-gray-700 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-indigo-400 transition-all"
      >
        {label}
      </Link>
    </li>
  );
}
