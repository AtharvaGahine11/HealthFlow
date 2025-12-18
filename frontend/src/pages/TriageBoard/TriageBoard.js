import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/AdminSidebar";
import "./TriageBoard.css";

export default function TriageBoard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (err) {
      console.log("Error fetching patients", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data.filter((u) => u.role === "doctor"));
    } catch (err) {
      console.log("Error loading doctors", err);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const assignDoctor = async (patientId, doctorId) => {
    if (!doctorId) return;
    try {
      const res = await axios.put(
        `http://localhost:8000/api/patients/${patientId}/assign-doctor`,
        { doctorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPatients((prev) =>
        prev.map((p) => (p._id === patientId ? res.data : p))
      );
    } catch (err) {
      alert("Failed to assign doctor");
    }
  };

  const getWaitTime = (checkInTime) => {
    return Math.floor((Date.now() - new Date(checkInTime)) / 60000);
  };

  const getProgressColor = (mins) => {
    if (mins < 15) return "linear-gradient(90deg, #10b981, #34d399)"; // Green Gradient
    if (mins < 45) return "linear-gradient(90deg, #f59e0b, #fbbf24)"; // Orange Gradient
    return "linear-gradient(90deg, #ef4444, #f87171)";                // Red Gradient
  };

  const getProgressWidth = (mins) => {
    const percentage = (mins / 60) * 100;
    return percentage > 100 ? 100 : percentage;
  };

  return (
    <div className="triage-container">
      <Sidebar />

      <div className="triage-main">
        <div className="triage-header">
          <div>
            <h1>Triage Command 🚑</h1>
            <p>Real-time patient prioritization & assignments</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <h2 className="active-count">
              {patients.length}
            </h2>
            <p className="active-label">Active Patients</p>
          </div>
        </div>

        <div className="triage-grid">
          {patients.map((p, index) => {
            const waitMins = getWaitTime(p.checkInTime);
            const isCritical = p.triageStatus === "Critical";

            return (
              <div
                key={p._id}
                className={`triage-card ${isCritical ? "critical" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="card-header">
                  <span className="patient-id">#{p._id.slice(-6).toUpperCase()}</span>
                  <span className={`status-pill ${p.triageStatus.toLowerCase()}`}>
                    {p.triageStatus}
                  </span>
                </div>

                {/* Info */}
                <h3>{p.name}</h3>
                <span className="room-text">📍 Room {p.room}</span>

                {/* Wait Time Bar */}
                <div className="wait-time-container">
                  <div className="wait-label">
                    <span>Wait Time</span>
                    <span>{waitMins} min</span>
                  </div>
                  <div className="progress-bg">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${getProgressWidth(waitMins)}%`,
                        background: getProgressColor(waitMins), // Changed prop name to match logic
                      }}
                    ></div>
                  </div>
                </div>

                {/* Doctor Select */}
                <div className="select-wrapper">
                  <select
                    className="doctor-select"
                    value={p.assignedDoctor ? p.assignedDoctor._id : ""}
                    onChange={(e) => assignDoctor(p._id, e.target.value)}
                  >
                    <option value="">👉 Assign Doctor</option>
                    {doctors.map((doc) => (
                      <option value={doc._id} key={doc._id}>
                        👨‍⚕️ {doc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}