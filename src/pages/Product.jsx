import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";


const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);

      const response = await fetch("/custom_products.json");
      const allProducts = await response.json();

      const selectedProduct = allProducts.find(
        (item) => String(item.id) === id
      );
      setProduct(selectedProduct);
      setLoading(false);

      const similar = allProducts.filter(
        (item) =>
          item.category === selectedProduct.category &&
          String(item.id) !== id
      );
      setSimilarProducts(similar);
      setLoading2(false);
    };

    getProduct();
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          {product.rating && (
            <p className="lead">
              {product.rating} <i className="fa fa-star"></i>
            </p>
          )}
          <h3 className="display-6 my-4">₹{product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const Loading2 = () => (
    <div className="my-4 py-4 d-flex">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="mx-3">
          <Skeleton height={360} width={260} />
        </div>
      ))}
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4 d-flex">
      {similarProducts.map((item) => (
        <div
          key={item.id}
          className="card mx-3 shadow-lg"
          style={{
            width: "260px",
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <img
            className="card-img-top p-3"
            src={item.image}
            alt={item.title}
            height={260}
            style={{ objectFit: "contain", borderRadius: "15px" }}
          />
          <div className="card-body text-center">
            <h6
              className="card-title text-truncate"
              title={item.title}
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              {item.title}
            </h6>
            <p className="text-muted mb-2">₹{item.price}</p>
            <div className="d-flex justify-content-center">
              <Link
                to={`/product/${item.id}`}
                className="btn btn-sm btn-dark mx-1"
              >
                View
              </Link>
              <button
                className="btn btn-sm btn-outline-dark mx-1"
                onClick={() => addProduct(item)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="mb-3">You may also like</h2>
            <Marquee
              pauseOnHover
              pauseOnClick
              speed={45}
              gradient={false}
              className="marquee-custom"
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
