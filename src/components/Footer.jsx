import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-400 py-4">
      <div className="container mx-auto text-center">
        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mb-2">
          <Link to="/dashboard" className="hover:text-white transition">About</Link>
          <Link to="/dashboard" className="hover:text-white transition">Contact</Link>
          <Link to="/dashboard" className="hover:text-white transition">Privacy Policy</Link>
        </div>

        {/* Copyright */}
        <p className="text-sm">© {new Date().getFullYear()} Suva. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
