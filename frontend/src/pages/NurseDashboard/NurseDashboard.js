import "./NurseDashboard.css";
import NurseSidebar from "../../components/Sidebar/NurseSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import EditVitalsModal from "../../components/EditVitalsModal/EditVitalsModal";
import { useNavigate } from "react-router-dom";

export default function NurseDashboard() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatients(res.data);
    } catch (err) {
      console.log("Error loading patients", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const openModal = (p) => {
    setSelected(p);
    setModalOpen(true);
  };

  // filter patients by search term
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="nurse-container">
      <NurseSidebar />

      <div className="nurse-main">

        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome, <span className="highlight">Nurse</span> 💚</h1>
            <p className="subtitle">Manage patient care and update vitals below.</p>
          </div>

          <div className="quote-card">
            <p className="quote">
              "Nurses dispense comfort, compassion, and caring without even a prescription."
            </p>
            <span className="author">— Val Saintsbury</span>
          </div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search patient by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="nurse-grid">
          {filteredPatients.map((p, i) => (
            <div
              key={p._id}
              className={`nurse-card ${p.triageStatus.toLowerCase()}`}
              onClick={() => navigate(`/patient/${p._id}`)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className={`status-pill ${p.triageStatus.toLowerCase()}`}>
                {p.triageStatus}
              </span>

              <h3>{p.name}</h3>
              <span className="room-text">📍 Room {p.room}</span>

              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(p);
                }}
              >
                ✏️ Update Vitals
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {modalOpen && (
        <EditVitalsModal
          patient={selected}
          setOpen={setModalOpen}
          onVitalsUpdate={fetchPatients} // refresh after save
        />
      )}
    </div>
  );
}