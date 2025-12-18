import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { 
  FaUserShield, 
  FaChartPie, 
  FaUserInjured, 
  FaUserMd, 
  FaClipboardList 
} from "react-icons/fa";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); 
  };

  return (
    <div className="sidebar">
      {/* Header Section */}
      <div className="logo-container">
        <h2 className="logo">
          <span>🏥</span> HealthFlow
        </h2>
        <div 
          className="role-badge" 
          style={{ 
            color: '#0284c7', 
            background: '#e0f2fe',
            border: '1px solid #bae6fd' 
          }}
        >
          <FaUserShield /> Admin Panel
        </div>
      </div>

      {/* Navigation Links with Staggered Animation */}
      <nav>
        <NavLink 
          to="/admin" 
          className="sidebar-link" 
          end
          style={{ animationDelay: "0.1s" }}
        >
          <FaChartPie /> Dashboard
        </NavLink>

        <NavLink 
          to="/admin/patients" 
          className="sidebar-link"
          style={{ animationDelay: "0.2s" }}
        >
          <FaUserInjured /> Patients
        </NavLink>

        <NavLink 
          to="/admin/staff" 
          className="sidebar-link"
          style={{ animationDelay: "0.3s" }}
        >
          <FaUserMd /> Staff Management
        </NavLink>

        <NavLink 
          to="/triage" 
          className="sidebar-link"
          style={{ animationDelay: "0.4s" }}
        >
          <FaClipboardList /> Triage Board
        </NavLink>
      </nav>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        🔒 Logout
      </button>
    </div>
  );
}