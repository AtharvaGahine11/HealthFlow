import { useEffect, useState } from "react";
import "./StaffPage.css";
import Sidebar from "../../components/Sidebar/AdminSidebar";
import axios from "axios";

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/staff", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaff(res.data);
    } catch (err) {
      console.log("Error fetching staff", err);
    }
  };

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="staff-container">
      <Sidebar />

      <div className="staff-main">
        
        {/* Header */}
        <div className="staff-header">
          <h1>Staff Team 👥</h1>
          
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search staff by name or role..."
          className="staff-search"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        {/* Table Wrapper */}
        <div className="staff-table-wrapper">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Assigned Patients</th>
              </tr>
            </thead>

            <tbody>
              {staff
                .filter((s) =>
                  s.name.toLowerCase().includes(search) ||
                  s.role.toLowerCase().includes(search)
                )
                .map((s) => (
                  <tr key={s._id}>
                    <td>
                      <strong>{s.name}</strong>
                    </td>
                    <td style={{ color: "#64748b" }}>{s.email}</td>

                    <td>
                      <span className={`role-badge ${s.role.toLowerCase()}`}>
                        {s.role}
                      </span>
                    </td>

                    <td style={{ fontWeight: "700", color: "#334155" }}>
                      {s.assignedPatientsCount}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}