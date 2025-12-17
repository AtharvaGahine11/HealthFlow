import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FaUserMd } from "react-icons/fa";

export default function DoctorSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // Go back to landing page
  };

  return (
    <div className="sidebar">
      {/* Header / Identity */}
      <div style={{ textAlign: "center", marginBottom: '2rem' }}>
        <h2 className="logo">🏥 HealthFlow</h2>
        <div className="role-badge" style={{ color: '#3b82f6', background: '#eff6ff' }}>
          <FaUserMd /> Doctor Panel
        </div>
      </div>

      {/* Spacer to push logout to bottom */}
      <div style={{ flex: 1 }}></div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        🔒 Logout
      </button>
    </div>
  );
}