import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NurseLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginNurse = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      if (res.data.role !== "nurse") {
        alert("This is not a nurse account.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigate("/nurse");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">

      <div className="login-left">
        <Link to="/" className="back-btn">← Back to Home</Link>

        <div>
          <h1 className="portal-title">Nurse Portal</h1>
          <p className="portal-sub">Vitals monitoring and patient care coordination.</p>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              className="login-input"
              type="email"
              placeholder="nurse@hospital.org"
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

          <button className="login-btn" onClick={loginNurse}>Sign In to Portal</button>

          <div className="switch-portal">
            <p>Not a Nurse?</p>
            <div className="portal-buttons">
              <Link to="/admin-login" className="portal-btn">🧠 Admin</Link>
              <Link to="/doctor-login" className="portal-btn">🩺 Doctor</Link>
              <Link to="/nurse-login" className="portal-btn active">👩🏻‍⚕️ Nurse</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card-glass">
          <div className="login-emoji">👩🏻‍⚕️</div>
          <h1>HealthFlow</h1>
          <p>Seamless care for every patient.</p>
        </div>
      </div>

    </div>
  );
}