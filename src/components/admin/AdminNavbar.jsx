// src/components/admin/AdminNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
    window.location.reload(); // force re-render to update navbar globally
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="/">Admin Panel</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#products">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#categories">Categories</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#offers">Offers</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#orders">Orders</a>
          </li>
        </ul>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
