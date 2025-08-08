// src/pages/AdminPanel.jsx
import React from "react";
import ProductManager from "../components/admin/ProductManager";
import CategoryManager from "../components/admin/CategoryManager";
import OfferManager from "../components/admin/OfferManager";
import OrderManager from "../components/admin/OrderManager";

const AdminPanel = () => {
  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Welcome, Admin!</h2>

        <div id="products" className="mb-5">
          <h4>Product Management</h4>
          <ProductManager />
        </div>

        <hr />

        <div id="categories" className="mb-5">
          <h4>Category Management</h4>
          <CategoryManager />
        </div>

        <hr />

        <div id="offers" className="mb-5">
          <h4>Offer Management</h4>
          <OfferManager />
        </div>

        <hr />

        <div id="orders" className="mb-5">
          <h4>Order Management</h4>
          <OrderManager />
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
