import "./EditVitalsModal.css";
import { useState } from "react";
import axios from "axios";

export default function EditVitalsModal({ patient, setOpen, onVitalsUpdate }) {
  const [form, setForm] = useState({
    bp: patient.vitals?.bp || "",
    temperature: patient.vitals?.temperature || "",
    spo2: patient.vitals?.spo2 || "",
    pulse: patient.vitals?.pulse || "",   
  });

  const token = localStorage.getItem("token");

  const updateVitals = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/patients/${patient._id}`,
        {
          vitals: {
            bp: form.bp,
            temperature: form.temperature,
            spo2: form.spo2,
            pulse: form.pulse,   
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onVitalsUpdate();
      setOpen(false);

    } catch (err) {
      console.log("Vitals update failed:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Vitals</h2>

        {/* BP Input */}
        <label className="input-label">Blood Pressure</label>
        <input
          type="text"
          placeholder="e.g. 120/80"
          value={form.bp}
          onChange={(e) => setForm({ ...form, bp: e.target.value })}
          style={{ animationDelay: '0.1s' }} 
        />

        {/* Pulse Input */}
        <label className="input-label">Pulse (BPM)</label>
        <input
          type="number"
          placeholder="e.g. 72"
          value={form.pulse}
          onChange={(e) => setForm({ ...form, pulse: e.target.value })}
          style={{ animationDelay: '0.2s' }}
        />

        {/* Temp Input */}
        <label className="input-label">Temperature (°F)</label>
        <input
          type="number"
          placeholder="e.g. 98.6"
          value={form.temperature}
          onChange={(e) => setForm({ ...form, temperature: e.target.value })}
          style={{ animationDelay: '0.3s' }}
        />

        {/* SpO2 Input */}
        <label className="input-label">SpO₂ (%)</label>
        <input
          type="number"
          placeholder="e.g. 99"
          value={form.spo2}
          onChange={(e) => setForm({ ...form, spo2: e.target.value })}
          style={{ animationDelay: '0.4s' }}
        />

        <div className="modal-actions">
          <button className="cancel" onClick={() => setOpen(false)}>
            Cancel
          </button>

          <button className="save" onClick={updateVitals}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}