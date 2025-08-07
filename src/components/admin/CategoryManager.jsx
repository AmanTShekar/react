// src/components/admin/CategoryManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../pages/AdminPanel.css";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);
  const API_URL = "http://localhost:5000/categories";

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
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
      setForm({ name: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error submitting category:", err);
    }
  };

  const handleEdit = (cat) => {
    setForm(cat);
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  return (
    <div className="admin-section">
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Category name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Category</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setForm({ name: "" });
          }}>Cancel</button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;
