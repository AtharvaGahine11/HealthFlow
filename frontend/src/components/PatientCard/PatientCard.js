import "./PatientCard.css";
import PulseLiveIcon from "../PulseLiveIcon/PulseLiveIcon";

export default function PatientCard({ patient, doctors, onAssignDoctor }) {
  
  // Calculate wait time in minutes
  const waitMins = Math.floor((Date.now() - new Date(patient.checkInTime)) / (1000 * 60));

  // Determine bar color based on wait time
  const getProgressColor = (mins) => {
    if (mins < 15) return "#10b981"; // Green
    if (mins < 45) return "#f59e0b"; // Orange
    return "#ef4444";                // Red
  };

  // Determine bar width
  const getProgressWidth = (mins) => {
    const percentage = (mins / 60) * 100;
    return percentage > 100 ? 100 : percentage;
  };

  return (
    <div className={`patient-card ${patient.triageStatus.toLowerCase()}`}>
      
      {/* Top Row: ID & Status Pill */}
      <div className="card-header">
        <span className="patient-id">#{patient._id.slice(-6).toUpperCase()}</span>
        <span className={`status-badge ${patient.triageStatus.toLowerCase()}`}>
          {patient.triageStatus}
        </span>
      </div>

      {/* Name & Pulse Icon */}
      <div className="patient-head">
        <PulseLiveIcon />
        <h3>{patient.name}</h3>
      </div>

      {/* Room Info */}
      <div className="room-info">
        📍 Room {patient.room}
      </div>

      {/* Wait Time Visualizer */}
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
              backgroundColor: getProgressColor(waitMins)
            }}
          ></div>
        </div>
      </div>

      {/* Doctor Assignment Dropdown */}
      <select
        className="doctor-select"
        value={patient.assignedDoctor?._id || ""}
        onChange={(e) => onAssignDoctor(patient._id, e.target.value)}
      >
        <option value="">👉 Assign Doctor</option>
        {doctors.map((doc) => (
          <option key={doc._id} value={doc._id}>
            👨‍⚕️ {doc.name}
          </option>
        ))}
      </select>
    </div>
  );
}