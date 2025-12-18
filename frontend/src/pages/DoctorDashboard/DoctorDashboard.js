import "./DoctorDashboard.css";
import DoctorSidebar from "../../components/Sidebar/DoctorSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

export default function DoctorDashboard() {
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch patients assigned to this doctor
  const fetchAssigned = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/patients/assigned/list",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignedPatients(res.data);
    } catch (err) {
      console.log("Failed to fetch assigned patients:", err);
    }
  };

  // Live updates with socket.io
  useEffect(() => {
    fetchAssigned();

    socket.on("vitalsUpdated", (updated) => {
      setAssignedPatients((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    });

    socket.on("newNote", (noteEvent) => {
      if (noteEvent.doctorNotified) {
        alert(`New nurse note on ${noteEvent.patientName}`);
      }
    });

    return () => {
      socket.off("vitalsUpdated");
      socket.off("newNote");
    };
    // eslint-disable-next-line
  }, []);

  const openProfile = (id) => {
    navigate(`/patient/${id}`);
  };

  // Filter patients based on search
  const filteredPatients = assignedPatients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctor-container">
      <DoctorSidebar />

      <div className="doctor-main">
        
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome, <span className="highlight">Doctor</span> 👨‍⚕️</h1>
            <p className="subtitle">Your assigned patients & real-time vitals monitoring.</p>
          </div>
          
          <div className="quote-card">
            <p className="quote">"Medicines cure diseases, but only doctors can cure patients."</p>
            <span className="author">— Carl Jung</span>
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search patient by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="assign-grid">
          {filteredPatients.length === 0 ? (
            <div className="empty-state">
              <p>No patients found.</p>
            </div>
          ) : (
            filteredPatients.map((p, index) => (
              <div 
                key={p._id} 
                className={`patient-card-doctor ${p.triageStatus.toLowerCase()}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="card-top">
                  <span className={`status-pill ${p.triageStatus.toLowerCase()}`}>
                    {p.triageStatus}
                  </span>
                  <span className="room-badge">📍 {p.room}</span>
                </div>

                <h3 className="patient-name">{p.name}</h3>

                {/* Mini Vitals Grid */}
                <div className="mini-vitals-grid">
                  <div className="vital-item">
                    <span className="label">BP</span>
                    <span className="val">{p.vitals?.bp || "--"}</span>
                  </div>
                  <div className="vital-item">
                    <span className="label">HR</span>
                    <span className="val">{p.vitals?.pulse || "--"} <small>bpm</small></span>
                  </div>
                  <div className="vital-item">
                    <span className="label">Temp</span>
                    <span className="val">{p.vitals?.temperature || "--"}°F</span>
                  </div>
                  <div className="vital-item">
                    <span className="label">SpO2</span>
                    <span className="val">{p.vitals?.spo2 || "--"}%</span>
                  </div>
                </div>

                <button
                  className="profile-btn"
                  onClick={() => openProfile(p._id)}
                >
                  View Full Profile →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}