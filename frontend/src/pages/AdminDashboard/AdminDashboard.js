import "./AdminDashboard.css";
import Sidebar from "../../components/Sidebar/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [nurseCount, setNurseCount] = useState(0);

  const token = localStorage.getItem("token");

  // ------------------------------
  // Fetch REAL Dashboard Stats
  // ------------------------------
  const fetchStats = async () => {
    try {
      // Fetch patients
      const pRes = await axios.get("http://localhost:8000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatientCount(pRes.data.length);

      // Fetch staff
      const sRes = await axios.get("http://localhost:8000/api/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDoctorCount(sRes.data.filter((u) => u.role === "doctor").length);
      setNurseCount(sRes.data.filter((u) => u.role === "nurse").length);

    } catch (err) {
      console.log("Dashboard Stats Error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-main">
        
        {/* Welcome & Quote Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>
              Welcome back, <span className="highlight">Admin</span> 👋
            </h1>
            <p className="subtitle">
              Here's what's happening in your hospital today.
            </p>
          </div>

          <div className="quote-card">
            <p className="quote">
              "Wherever the art of Medicine is loved, there is also a love of Humanity."
            </p>
            <span className="author">— Hippocrates</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">

          {/* Card 1: Patients */}
          <div className="stat-card" style={{ animationDelay: "0.2s" }}>
            <div
              className="stat-icon"
              style={{ background: "#eff6ff", color: "#3b82f6" }}
            >
              🧑‍⚕️
            </div>
            <h2>{patientCount}</h2>
            <p>Active Patients</p>
          </div>

          {/* Card 2: Doctors */}
          <div className="stat-card" style={{ animationDelay: "0.3s" }}>
            <div
              className="stat-icon"
              style={{ background: "#eef2ff", color: "#6366f1" }}
            >
              👨‍⚕️
            </div>
            <h2>{doctorCount}</h2>
            <p>Doctors On Duty</p>
          </div>

          {/* Card 3: Nurses */}
          <div className="stat-card" style={{ animationDelay: "0.4s" }}>
            <div
              className="stat-icon"
              style={{ background: "#f0fdfa", color: "#14b8a6" }}
            >
              💚
            </div>
            <h2>{nurseCount}</h2>
            <p>Active Nurses</p>
          </div>

        </div>
      </div>
    </div>
  );
}
