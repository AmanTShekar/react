// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducer/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">🛍️ MyShop</Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/product" onClick={() => setMobileMenuOpen(false)}>Products</Link></li>
          <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link></li>

          {!auth.isLoggedIn ? (
            <li><Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
          ) : (
            <li className="user-dropdown">
              <div
                className="user-dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤 {auth.user?.name || "User"} ▾
              </div>

              {dropdownOpen && (
                <div className="user-dropdown-menu">
                  <div
                    className="user-dropdown-item"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    Profile
                  </div>
                  <div
                    className="user-dropdown-item"
                    onClick={() => {
                      navigate("/orders");
                      setDropdownOpen(false);
                    }}
                  >
                    My Orders
                  </div>
                  <div className="user-dropdown-divider" />
                  <div
                    className="user-dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
