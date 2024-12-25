import Link from "next/link";
import React from "react";


export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link href="/">
                <p className="flex items-center py-5 px-2 text-orange-500">
                  <svg
                    className="h-6 w-6 mr-1 text-orange-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2l9 4.5-9 4.5-9-4.5L12 2zm0 6.5l9 4.5-9 4.5-9-4.5 9-4.5z"
                    />
                  </svg>
                  <span className="font-bold">MyApp</span>
                </p>
              </Link>
            </div>

            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <p className="py-5 px-3 text-gray-700 hover:text-orange-500">
                  Home
                </p>
              </Link>
            </div>
          </div>

          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/signup">
              <p className="py-2 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
                Sign Up
              </p>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu hidden md:hidden">
        <Link href="/">
          <p className="block py-2 px-4 text-sm hover:bg-gray-200">Home</p>
        </Link>
        <Link href="/signin">
          <p className="block py-2 px-4 text-sm hover:bg-gray-200">Sign In</p>
        </Link>
      </div>
    </nav>
  );
}
