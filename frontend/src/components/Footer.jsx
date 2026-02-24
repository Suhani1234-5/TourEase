import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-gray-400 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-white font-bold text-3xl tracking-tight">
              Tour<span className="text-teal-400">Ease</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Smart travel companion for unforgettable adventures.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300 font-medium">support@tourease.com</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest">
                San Francisco, CA, USA
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-white font-bold mb-7 text-[12px] uppercase tracking-[0.2em]">Product</h4>
              <ul className="space-y-4">
                <FooterLink to="/features" label="Features" />
                <FooterLink to="/destinations" label="Destinations" />
                <FooterLink to="/plan-trip" label="Plan Trip" />
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-7 text-[12px] uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-4">
                <FooterLink to="/about" label="About Us" />
                <FooterLink to="/contact" label="Contact" />
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-7 text-[12px] uppercase tracking-[0.2em]">Support</h4>
              <ul className="space-y-4">
                <FooterLink to="/privacy" label="Privacy" />
                <FooterLink to="/terms" label="Terms" />
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-bold text-[12px] uppercase tracking-[0.2em]">Newsletter</h4>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#111827] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 transition-all outline-none"
              />
              <Link
                to="/signup"
                className="block w-full text-center bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-900/40 active:scale-95 text-sm uppercase tracking-wider"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-[0.25em]">
          <p>&copy; 2026 TourEase. All rights reserved.</p>
          <div className="flex items-center">
            Handcrafted with <span className="text-orange-500 text-sm mx-1 animate-bounce">🧡</span> globally
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <li className="group flex items-center">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-3 opacity-70 group-hover:opacity-100 transition-all"></span>
      <Link to={to} className="text-sm group-hover:text-teal-400 transition-all">
        {label}
      </Link>
    </li>
  );
}