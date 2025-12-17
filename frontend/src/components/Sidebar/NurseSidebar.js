import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FaUserNurse } from "react-icons/fa";

export default function NurseSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // Go back to landing page
  };

  return (
    <div className="sidebar">
      {/* Header Section */}
      <div style={{ textAlign: "center" }}>
        <h2 className="logo">🏥 HealthFlow</h2>
        <div style={{ margin: "20px 0", color: "#14b8a6" }}>
          <FaUserNurse size={48} />
          <h3 className="sidebar-title" style={{ marginTop: "8px", fontSize: "1rem" }}>
            Nurse Panel
          </h3>
        </div>
      </div>

      {/* No Navigation Links (Empty Spacer) */}
      <div style={{ flex: 1 }}></div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        🔒 Logout
      </button>
    </div>
  );
}