// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Home,
  Product,
  Products,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from './pages';

import AdminPanel from './pages/AdminPanel';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminNavbar from './components/admin/AdminNavbar'; // ✅ import admin navbar\



const App = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  const isAdmin = auth?.isLoggedIn && auth?.userType === 'admin';
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop>
        {/* ✅ Show AdminNavbar only for admin */}
        {isAdmin && isAdminRoute ? <AdminNavbar /> : <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/admin"
            element={
              isAdmin ? <AdminPanel /> : <PageNotFound />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {/* ✅ Hide Footer in admin routes */}
        {!isAdminRoute && <Footer />}
      </ScrollToTop>
    </>
  );
};

export default App;
