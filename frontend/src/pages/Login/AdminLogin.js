import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      if (res.data.role !== "admin") {
        alert("This is not an admin account.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">

      {/* LEFT FORM PANEL */}
      <div className="login-left">
        <Link to="/" className="back-btn">← Back to Home</Link>

        <div>
          <h1 className="portal-title">Admin Portal</h1>
          <p className="portal-sub">Secure access for hospital administration.</p>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              className="login-input"
              type="email"
              placeholder="admin@hospital.org"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="flex-between">
              <label className="input-label">Password</label>
              <Link className="forgot">Forgot password?</Link>
            </div>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={loginAdmin}>Sign In to Dashboard</button>

          <div className="switch-portal">
            <p>Not an Administrator?</p>
            <div className="portal-buttons">
              <Link to="/admin-login" className="portal-btn active">🧠 Admin</Link>
              <Link to="/doctor-login" className="portal-btn">🩺 Doctor</Link>
              <Link to="/nurse-login" className="portal-btn">💚 Nurse</Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT DECOR PANEL */}
      <div className="login-right">
        <div className="login-card-glass">
          <div className="login-emoji">🧠</div>
          <h1>HealthFlow</h1>
          <p>Centralized control for modern healthcare.</p>
        </div>
      </div>

    </div>
  );
}