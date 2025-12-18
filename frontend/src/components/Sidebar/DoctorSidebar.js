import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FaUserMd } from "react-icons/fa";

export default function DoctorSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); 
  };

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="logo-container">
        <h2 className="logo">
          <span>🏥</span> HealthFlow
        </h2>
        <div 
          className="role-badge" 
          style={{ 
            color: '#6366f1', 
            background: '#eef2ff',
            border: '1px solid #c7d2fe'
          }}
        >
          <FaUserMd /> Doctor Panel
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }}></div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        🔒 Logout
      </button>
    </div>
  );
}