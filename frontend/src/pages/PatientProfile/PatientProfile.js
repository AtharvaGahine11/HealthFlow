import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./PatientProfile.css";

import VitalsChart from "../../components/VitalsChart/VitalsChart";
import EditVitalsModal from "../../components/EditVitalsModal/EditVitalsModal";
import NotesBox from "../../components/NotesBox/NotesBox";

import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import DoctorSidebar from "../../components/Sidebar/DoctorSidebar";
import NurseSidebar from "../../components/Sidebar/NurseSidebar";

export default function PatientProfile() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const token = localStorage.getItem("token");

  // Choose correct sidebar
  function getSidebar() {
    const role = localStorage.getItem("role");

    if (role === "admin") return <AdminSidebar />;
    if (role === "doctor") return <DoctorSidebar />;
    if (role === "nurse") return <NurseSidebar />;
    return null;
  }

  const fetchPatient = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/patients/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPatient(res.data);
    } catch (err) {
      console.log("Failed to load patient");
      setPatient(null);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  if (loading) return <h2 className="loading">Loading patient profile...</h2>;
  if (!patient) return <h2 className="loading">Patient not found</h2>;

  return (
    <div className="profile-container">
      {getSidebar()}

      <div className="profile-main">
        
        {/* Header */}
        <div className="profile-header">
          <div>
            <h1>{patient.name}</h1>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Patient ID: {id}</span>
          </div>
          
          <button className="edit-btn" onClick={() => setOpenModal(true)}>
            ✏️ Edit Vitals
          </button>
        </div>

        {/* Info Card */}
        <div className="info-card" style={{ animationDelay: '0.1s' }}>
          <h2>Patient Details</h2>
          <div className="info-details">
            <div className="detail-item">
              <label>Room Number</label>
              <span>{patient.room}</span>
            </div>
            <div className="detail-item">
              <label>Triage Status</label>
              <span style={{ 
                color: patient.triageStatus === 'Critical' ? '#ef4444' : 
                       patient.triageStatus === 'Stable' ? '#10b981' : '#f59e0b'
              }}>
                {patient.triageStatus}
              </span>
            </div>
            <div className="detail-item">
              <label>Assigned Doctor</label>
              <span>{patient.assignedDoctor ? patient.assignedDoctor.name : "Unassigned"}</span>
            </div>
            <div className="detail-item">
              <label>Check-In Time</label>
              <span>{new Date(patient.checkInTime).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Vitals Card */}
        <div className="vitals-card" style={{ animationDelay: '0.2s' }}>
          <h2>Current Vitals</h2>
          <div className="vitals-grid">
            <div className="vital-box">
              <span className="vital-label">Blood Pressure</span>
              <span className="vital-value">{patient.vitals?.bp || "--"}</span>
            </div>
            <div className="vital-box">
              <span className="vital-label">Temperature</span>
              <span className="vital-value">{patient.vitals?.temperature || "--"}°F</span>
            </div>
            <div className="vital-box">
              <span className="vital-label">SpO2 (Oxygen)</span>
              <span className="vital-value">{patient.vitals?.spo2 || "--"}%</span>
            </div>
            <div className="vital-box">
              <span className="vital-label">Heart Rate</span>
              <span className="vital-value">{patient.vitals?.pulse || "--"} <small style={{fontSize:'0.8rem', color:'#94a3b8'}}>bpm</small></span>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="chart-card" style={{ animationDelay: '0.3s' }}>
          <h2>Vitals History</h2>
          <VitalsChart vitals={patient.vitalsHistory || []} />
        </div>

        {/* Notes Card */}
        <div className="notes-card" style={{ animationDelay: '0.4s' }}>
          <h2>Medical Notes</h2>
          <NotesBox patientId={id} />
        </div>

      </div>

      {openModal && (
        <EditVitalsModal
          patient={patient}
          setOpen={setOpenModal}
          onVitalsUpdate={fetchPatient}
        />
      )}
    </div>
  );
}