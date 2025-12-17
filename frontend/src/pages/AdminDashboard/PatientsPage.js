import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Sidebar/AdminSidebar"; 
import AddPatientModal from "../../components/AddPatientModal/AddPatientModal"; 
import "./PatientsPage.css"; // ✅ FIXED: Changed from PatientPage.css to PatientsPage.css

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Wrapped in useCallback to fix the useEffect warning
  const fetchPatients = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (err) {
      console.log("Error fetching patients:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]); // ✅ Added dependency

  // Filter logic
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-list-container">
      <AdminSidebar />

      <div className="patient-list-main">
        
        {/* Header */}
        <div className="page-header">
          <h1>Patients 🏥</h1>
          <button className="add-patient-btn" onClick={() => setIsModalOpen(true)}>
            + Add New Patient
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search patient by name or room..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Status</th>
                <th>Assigned Doctor</th>
                <th>Check-In Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                    No patients found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <strong>{p.name}</strong>
                    </td>
                    <td>{p.room}</td>
                    <td>
                      <span className={`status-pill ${p.triageStatus.toLowerCase()}`}>
                        {p.triageStatus}
                      </span>
                    </td>
                    <td style={{ color: p.assignedDoctor ? "#0f172a" : "#94a3b8" }}>
                      {p.assignedDoctor ? `👨‍⚕️ ${p.assignedDoctor.name}` : "Unassigned"}
                    </td>
                    <td>{new Date(p.checkInTime).toLocaleString()}</td>
                    <td>
                      <Link to={`/patient/${p._id}`} className="view-link">
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddPatientModal
          onClose={() => setIsModalOpen(false)}
          onAdded={fetchPatients}
        />
      )}
    </div>
  );
}