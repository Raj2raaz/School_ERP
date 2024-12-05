import React from "react";
import { Link } from "react-router-dom";

function LandingHeader() {
  return (
    <header className="w-full bg-white shadow-lg py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="text-2xl font-bold text-blue-800">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          MySchool
        </Link>
      </div>
      <nav className="flex space-x-6 text-lg">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          Home
        </Link>
        <a
          href="#about"
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          About
        </a>
        <a
          href="#contact"
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          Contact Us
        </a>
      </nav>
    </header>
  );
}

export default LandingHeader;
