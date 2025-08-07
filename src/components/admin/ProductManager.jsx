import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../pages/AdminPanel.css';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    offerId: ""
  });
  const [editingId, setEditingId] = useState(null);

  const PRODUCT_API = "http://localhost:5000/products";
  const CATEGORY_API = "http://localhost:5000/categories";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        categoryId: parseInt(form.categoryId),
        offerId: form.offerId ? parseInt(form.offerId) : null
      };

      if (editingId) {
        await axios.put(`${PRODUCT_API}/${editingId}`, productData);
      } else {
        await axios.post(PRODUCT_API, productData);
      }

      setForm({ name: "", price: "", categoryId: "", offerId: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      offerId: product.offerId || ""
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${PRODUCT_API}/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="admin-section">
      <h2>Product Manager</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="offerId"
          placeholder="Offer ID (optional)"
          value={form.offerId}
          onChange={handleChange}
        />

        <button type="submit">{editingId ? "Update" : "Add"} Product</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", price: "", categoryId: "", offerId: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Offer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{getCategoryName(p.categoryId)}</td>
              <td>{p.offerId || "—"}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;
