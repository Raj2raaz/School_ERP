import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-lg py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-800">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          MySchool
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-lg">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          Contact Us
        </Link>
      </nav>

      {/* Mobile Menu Icon */}
      <div
        className="md:hidden text-2xl text-blue-800 cursor-pointer"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg py-4 px-8 z-40 w-64">
          <nav className="flex flex-col space-y-4 text-lg">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to=""
              className="text-gray-600 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to=""
              className="text-gray-600 hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default LandingHeader;
