import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../constants/navigation";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(
    location?.search?.slice(3)?.split("%20")?.join(" ") || ""
  );
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchInput) {
      navigate(`/dashboard/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => e.preventDefault();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogout(false);
    } catch (error) {
      console.error("Issue with logout:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        {/* Logo */}
        <Link to={"/dashboard"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav) => (
            <NavLink
              key={nav.href}
              to={nav.href}
              className={({ isActive }) =>
                `px-2 hover:text-neutral-100 ${isActive ? "text-white" : ""}`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* Search & User Section */}
        <div className="ml-auto flex items-center gap-5 relative">
          {/* Search Input */}
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border border-neutral-700 rounded-lg hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white hover:text-gray-300 cursor-pointer">
              <IoSearchOutline />
            </button>
          </form>

          {/* User Icon & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-all"
              onClick={() => setShowLogout((prev) => !prev)}
            >
              <img src={userIcon} alt="User" className="w-full h-full" />
            </div>

            {/* Logout Dropdown */}
            <div
              className={`absolute right-0 mt-3 w-36 bg-neutral-900 text-white py-2 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform ${
                showLogout
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-[-10px] scale-95 pointer-events-none"
              }`}
            >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 bg-neutral-600 hover:bg-neutral-700 transition-all duration-200 rounded-md cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
