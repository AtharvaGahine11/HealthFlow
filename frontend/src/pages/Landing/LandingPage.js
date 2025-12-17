import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">

      {/* Navbar - Cleaned up: Only Logo on the left */}
      <nav className="navbar">
        <div className="logo">
          <span>🏥</span> HealthFlow
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smarter Healthcare,<br />Real-Time Precision</h1>
          <p>
            A modern triage & resource coordination system designed for hospitals 
            that need instant insights, optimized patient flow, and role-based control.
          </p>
          <Link to="/admin-login" className="hero-btn">Launch HealthFlow →</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Everything You Need</h2>
        <p className="subtext">Powerful tools designed for modern healthcare facilities</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📈</div>
            <h3>Real-Time Monitoring</h3>
            <p>Live vitals, instant triage updates, and emergency alerts.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🧑‍⚕️</div>
            <h3>Staff Coordination</h3>
            <p>Assign doctors & nurses smoothly with drag-and-drop workflow.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🛡️</div>
            <h3>Secure & Compliant</h3>
            <p>Role-based access control with encrypted medical data.</p>
          </div>

          <div className="feature-card">
            <div className="icon">⏱️</div>
            <h3>Smart Scheduling</h3>
            <p>Optimized patient routing with automated triage queues.</p>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="role-section">
        <h2>Select Your Role</h2>
        <p className="subtext">Access your specific dashboard</p>

        <div className="role-grid">
          {/* Admin Card */}
          <div className="role-card">
            <div className="role-icon">🧠</div>
            <h3>Administrator</h3>
            <p>Full system access, staff management, and analytics.</p>
            <Link to="/admin-login" className="role-link">Login as Admin</Link>
          </div>

          {/* Doctor Card */}
          <div className="role-card">
            <div className="role-icon">🩺</div>
            <h3>Physician</h3>
            <p>Patient care, diagnosis, and treatment planning.</p>
            <Link to="/doctor-login" className="role-link">Login as Doctor</Link>
          </div>

          {/* Nurse Card */}
          <div className="role-card">
            <div className="role-icon">👩🏻‍⚕️</div>
            <h3>Nurse</h3>
            <p>Vitals monitoring, patient care, and task management.</p>
            <Link to="/nurse-login" className="role-link">Login as Nurse</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2024 HealthFlow — Designed for modern healthcare.
      </footer>

    </div>
  );
}