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
    navigate("/"); // Go back to landing page
  };

  return (
    <div className="sidebar">
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: '2rem' }}>
        <h2 className="logo">🏥 HealthFlow</h2>
        <div className="role-badge" style={{ color: '#0ea5e9', background: '#e0f2fe' }}>
          <FaUserShield /> Admin Panel
        </div>
      </div>

      {/* Navigation Links (Kept for Admin Only) */}
      <nav>
        <NavLink to="/admin" className="sidebar-link" end>
          <FaChartPie /> Dashboard
        </NavLink>

        <NavLink to="/admin/patients" className="sidebar-link">
          <FaUserInjured /> Patients
        </NavLink>

        <NavLink to="/admin/staff" className="sidebar-link">
          <FaUserMd /> Staff Management
        </NavLink>

        <NavLink to="/triage" className="sidebar-link">
          <FaClipboardList /> Triage Board
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div style={{ marginTop: 'auto' }}>
        <button className="logout-btn" onClick={handleLogout}>
          🔒 Logout
        </button>
      </div>
    </div>
  );
}