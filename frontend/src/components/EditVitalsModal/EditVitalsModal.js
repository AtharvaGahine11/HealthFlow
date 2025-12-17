import "./EditVitalsModal.css";
import { useState } from "react";
import axios from "axios";

export default function EditVitalsModal({ patient, setOpen, onVitalsUpdate }) {
  const [form, setForm] = useState({
    bp: patient.vitals?.bp || "",
    temperature: patient.vitals?.temperature || "",
    spo2: patient.vitals?.spo2 || "",
    pulse: patient.vitals?.pulse || "",   // ✅ Ensure pulse loads correctly
  });

  const token = localStorage.getItem("token");

  // -------------------------------
  // UPDATE VITALS
  // -------------------------------
  const updateVitals = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/patients/${patient._id}`,
        {
          vitals: {
            bp: form.bp,
            temperature: form.temperature,
            spo2: form.spo2,
            pulse: form.pulse,   // ✅ Send pulse to backend
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh parent component (PatientProfile)
      onVitalsUpdate();

      // Close modal
      setOpen(false);

    } catch (err) {
      console.log("Vitals update failed:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Vitals</h2>

        <input
          type="text"
          placeholder="Blood Pressure (e.g. 120/80)"
          value={form.bp}
          onChange={(e) => setForm({ ...form, bp: e.target.value })}
        />

        <input
          type="number"
          placeholder="Temperature (°F)"
          value={form.temperature}
          onChange={(e) => setForm({ ...form, temperature: e.target.value })}
        />

        <input
          type="number"
          placeholder="SpO₂ (%)"
          value={form.spo2}
          onChange={(e) => setForm({ ...form, spo2: e.target.value })}
        />

        <input
          type="number"
          placeholder="Pulse (bpm)"
          value={form.pulse}
          onChange={(e) => setForm({ ...form, pulse: e.target.value })}
        />

        <div className="modal-actions">
          <button className="cancel" onClick={() => setOpen(false)}>
            Cancel
          </button>

          <button className="save" onClick={updateVitals}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
