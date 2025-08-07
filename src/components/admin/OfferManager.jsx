// src/components/admin/OfferManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../pages/AdminPanel.css";

const OfferManager = () => {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({ title: "", discount: "" });
  const [editingId, setEditingId] = useState(null);
  const API_URL = "http://localhost:5000/offers";

  const fetchOffers = async () => {
    try {
      const res = await axios.get(API_URL);
      setOffers(res.data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ title: "", discount: "" });
      setEditingId(null);
      fetchOffers();
    } catch (err) {
      console.error("Error submitting offer:", err);
    }
  };

  const handleEdit = (offer) => {
    setForm(offer);
    setEditingId(offer.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchOffers();
      } catch (err) {
        console.error("Error deleting offer:", err);
      }
    }
  };

  return (
    <div className="admin-section">
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="title"
          placeholder="Offer title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={form.discount}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Offer</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setForm({ title: "", discount: "" });
          }}>Cancel</button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.title}</td>
              <td>{offer.discount}%</td>
              <td>
                <button onClick={() => handleEdit(offer)}>Edit</button>
                <button onClick={() => handleDelete(offer.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfferManager;
