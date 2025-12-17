import { useState } from "react";
import api from "../../utils/api";
import "./AddPatientModal.css";

export default function AddPatientModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    name: "",
    room: "",
    triageStatus: "Stable"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPatient = async () => {
    if (!form.name || !form.room) return alert("Please fill in all fields!");

    try {
      await api.post("/patients", form); // POST request
      onAdded(); // refresh patient list
      onClose(); // close modal
    } catch (err) {
      console.log("Error adding patient:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents closing when clicking inside the box */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>New Patient 🏥</h2>

        <div className="form-group">
          <input
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <div className="form-group">
          <input
            name="room"
            placeholder="Room Number (e.g. A-101)"
            value={form.room}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <select
            name="triageStatus"
            value={form.triageStatus}
            onChange={handleChange}
          >
            <option value="Stable">🟢 Stable</option>
            <option value="Urgent">🟠 Urgent</option>
            <option value="Critical">🔴 Critical</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="add-btn" onClick={addPatient}>
            + Add Patient
          </button>
        </div>
      </div>
    </div>
  );
}