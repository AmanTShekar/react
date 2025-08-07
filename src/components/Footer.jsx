import React, { useEffect, useState } from "react";
import axios from "axios";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/offers") // ← use 5000 instead of 3000
      .then((res) => {
        setOffers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch offers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="text-center my-5">
      <h1 className="mb-4">🔥 Current Offers</h1>

      <div className="d-flex align-items-center justify-content-center pb-5">
        <div className="col-md-8">
          {loading ? (
            <p>Loading offers...</p>
          ) : offers.length === 0 ? (
            <p>No offers available right now.</p>
          ) : (
            offers.map((offer) => (
              <div
                key={offer.id}
                className="card mb-4 shadow-sm border-0 rounded-4"
                style={{ background: "#f8f9fa" }}
              >
                <div className="card-body text-start">
                  <h5 className="card-title fw-bold">{offer.title}</h5>
                  <p className="card-text text-muted">{offer.description}</p>
                  <span className="badge bg-success rounded-pill">
                    {offer.discount}% OFF
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Offers;
