# 🛒 eCommerce Admin Panel & Frontend (React + JSON Server)

This is a simple full-stack eCommerce admin panel and frontend built using:

- React (with Bootstrap styling)
- `json-server` (for simulating a REST API)
- Role-based Admin Dashboard
- Live data interaction via `http://localhost:5000`

---

## ✨ Features

### 🔹 Admin Panel
- Manage **Products**, **Categories**, **Offers**, and **Orders**
- Add and Delete **new items** via a live `json-server` API
- Edit is supported only for new items added through the Admin Panel

### 🔹 Frontend
- Customer-facing UI to:
  - Browse products
  - View offers (in clean card format)
  - See featured categories and orders

---

## ⚠️ Limitations

- 🚫 Existing items (pre-populated in `db.json`) **cannot be edited or deleted**
- ✅ Newly added items **can be updated or removed** by the Admin Panel

---
## 🚀 Getting Started

### 1. Clone the repo

### bash
git clone https://github.com/AmanTShekar/react.git
cd react

### 2.To Run
npm install

npx json-server --watch db.json --port 5000

npm run dev

