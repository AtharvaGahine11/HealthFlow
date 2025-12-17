import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginDoctor = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      if (res.data.role !== "doctor") {
        alert("This is not a doctor account.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigate("/doctor");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">

      <div className="login-left">
        <Link to="/" className="back-btn">← Back to Home</Link>

        <div>
          <h1 className="portal-title">Physician Portal</h1>
          <p className="portal-sub">Access patient records and diagnostic tools.</p>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              className="login-input"
              type="email"
              placeholder="doctor@hospital.org"
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

          <button className="login-btn" onClick={loginDoctor}>Sign In to Portal</button>

          <div className="switch-portal">
            <p>Not a Physician?</p>
            <div className="portal-buttons">
              <Link to="/admin-login" className="portal-btn">🧠 Admin</Link>
              <Link to="/doctor-login" className="portal-btn active">🩺 Doctor</Link>
              <Link to="/nurse-login" className="portal-btn">💚 Nurse</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card-glass">
          <div className="login-emoji">🩺</div>
          <h1>HealthFlow</h1>
          <p>Advanced tools for clinical excellence.</p>
        </div>
      </div>

    </div>
  );
}