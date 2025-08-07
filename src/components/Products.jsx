import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const result = await res.json();
        setData(result);
        setFilter(result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Error loading products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  const filterProduct = (category) => {
    const updated =
      category === "All"
        ? data
        : data.filter((item) => item.category === category);
    setFilter(sortProducts(updated, sort));
  };

  const sortProducts = (products, sortType) => {
    switch (sortType) {
      case "lowToHigh":
        return [...products].sort((a, b) => a.price - b.price);
      case "highToLow":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSort(selected);
    setFilter(sortProducts(filter, selected));
  };

  const categories = [
    "All",
    "Electronics",
    "Wearables",
    "Smart Home",
    "Audio",
    "Gaming",
    "Accessories",
  ];

  const Loading = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <Skeleton height={400} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      {/* Filter and Sort UI */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="btn-group mb-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className="btn btn-dark btn-lg mx-1 mb-2"
              onClick={() => filterProduct(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-2">
          <select
            className="form-select form-select-lg border-dark"
            value={sort}
            onChange={handleSortChange}
            style={{ width: "220px" }}
          >
            <option value="default">Sort by: Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="row">
        {filter.map((product) => (
          <div
            key={product.id}
            className="col-xl-4 col-lg-6 col-md-6 mb-5 d-flex align-items-stretch"
          >
            <div className="card shadow w-100 border-0">
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: "320px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title fw-semibold">{product.title}</h4>
                <p className="card-text text-muted flex-grow-1 fs-6">
                  {product.description?.substring(0, 80)}...
                </p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="fw-bold fs-5 text-success">${product.price}</span>
                  {product.offer && (
                    <span className="badge bg-warning text-dark fs-6">
                      {product.offer}
                    </span>
                  )}
                </div>
                <div className="mt-4 d-flex justify-content-between">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-dark btn-lg"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-dark btn-lg"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container my-5 py-3">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">Shop Smart</h1>
        <hr className="w-25 mx-auto border-dark" />
      </div>
      {loading ? <Loading /> : <ShowProducts />}
    </div>
  );
};

export default Products;
