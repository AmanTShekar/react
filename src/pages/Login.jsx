import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/reducer/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (auth?.isLoggedIn) {
      if (auth.userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [auth, navigate]);

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        const payload = {
          user,
          userType: user.role, // "admin" or "user"
        };

        // ✅ Dispatch + save to localStorage
        dispatch(loginSuccess(payload));
        localStorage.setItem("auth", JSON.stringify({
          isLoggedIn: true,
          user,
          userType: user.role,
        }));

        // ✅ Navigate based on role
        navigate(user.role === "admin" ? "/admin" : "/");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="container my-5 py-5">
      <h1 className="text-center mb-4 fw-bold">Login</h1>
      <hr className="mb-4" />
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4 col-sm-10">
          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              padding: "35px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email address</label>
                <input
                  type="email"
                  className="form-control rounded-pill px-4 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control rounded-pill px-4 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-dark btn-lg rounded-pill"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-3 text-center text-muted">
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
