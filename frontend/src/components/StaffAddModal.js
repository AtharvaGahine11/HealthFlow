import { useState } from "react";
import axios from "axios";
import "./AddStaffModal.css";

export default function AddStaffModal({ setOpen, refreshStaff }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/staff",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      refreshStaff();
      setOpen(false);
    } catch (err) {
      alert("Failed to add staff");
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Add Staff 👥</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="cancel" onClick={() => setOpen(false)}>Cancel</button>
          <button className="save" onClick={handleSubmit}>Add Staff ✔️</button>
        </div>
      </div>
    </div>
  );
}
