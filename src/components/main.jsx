import React from "react";

const Home = () => {
  return (
    <>
      {/* Google Font: Montserrat */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            style={{
              height: "500px",
              objectFit: "cover",
              filter: "brightness(65%)",
            }}
          />
          <div className="card-img-overlay d-flex align-items-center">
            {/* LEFT-ALIGNED TEXT */}
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "4rem",
                fontWeight: "700",
                lineHeight: "1.1",
                color: "#ffffff",
                textAlign: "left",
                maxWidth: "100%",
              }}
            >
              <div style={{ marginLeft: "30px" }}>
                New Season <br />
                Arrivals
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
