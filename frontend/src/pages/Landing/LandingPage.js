import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>🏥</span> HealthFlow
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it Works</a></li>
          <li><a href="#roles">Login</a></li>
        </ul>
       
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">✨ New: AI-Powered Triage Support</div>
          <h1>Smarter Healthcare,<br />Real-Time Precision</h1>
          <p>
            A modern triage & resource coordination system designed for hospitals 
            that need instant insights, optimized patient flow, and role-based control.
          </p>
          <div className="hero-actions">
            <Link to="/admin-login" className="hero-btn">Launch HealthFlow →</Link>
            <a href="#how-it-works" className="secondary-btn">View Demo</a>
          </div>
        </div>
      </section>

      {/* Statistics Section (New) */}
      <section className="stats-bar">
        <div className="stat-item">
          <h2>40%</h2>
          <p>Reduction in Wait Times</p>
        </div>
        <div className="stat-item">
          <h2>10k+</h2>
          <p>Patients Managed</p>
        </div>
        <div className="stat-item">
          <h2>99.9%</h2>
          <p>System Uptime</p>
        </div>
      </section>

      {/* Workflow Section (New) */}
      <section id="how-it-works" className="workflow-section">
        <h2>How HealthFlow Works</h2>
        <p className="subtext">Streamlined patient management from entry to discharge.</p>
        
        <div className="workflow-grid">
          <div className="workflow-step">
            <div className="step-number">01</div>
            <h3>Patient Entry</h3>
            <p>Nurse inputs vitals and symptoms. The system auto-calculates triage priority scores.</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">02</div>
            <h3>Smart Allocation</h3>
            <p>Admins assign available beds and doctors based on real-time urgency and specialty.</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">03</div>
            <h3>Treatment & Tracking</h3>
            <p>Doctors track patient progress live, updating status until discharge or admission.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
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

      {/* Testimonials (New) */}
      <section className="testimonials-section">
        <div className="testimonial-content">
          <div className="quote-icon">“</div>
          <blockquote>
            HealthFlow revolutionized our emergency department. We reduced patient wait times significantly within the first month of implementation.
          </blockquote>
          <div className="author">
            <strong>Dr. Anjali Mehta</strong>
            <span>Chief Medical Officer, City Hospital</span>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section id="roles" className="role-section">
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

      {/* Final CTA (New) */}
      <section className="cta-section">
        <h2>Ready to optimize your hospital?</h2>
        <p>Join the future of healthcare management today.</p>
        <Link to="/admin-login" className="cta-btn">Get Started Now</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>🏥</span> HealthFlow
          </div>
          <p>© 2024 HealthFlow — Designed for modern healthcare.</p>
        </div>
      </footer>

    </div>
  );
}