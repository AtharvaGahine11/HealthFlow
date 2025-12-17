import { useEffect, useState } from "react";
import api from "../../utils/api";
import "./LogsPage.css";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/logs");
      setLogs(res.data);
    } catch (err) {
      console.log("Error fetching logs", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="logs-container">
      <h1>Logs</h1>

      <table className="logs-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Performed By</th>
            <th>Patient</th>
            <th>Details</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.action}</td>
              <td>{log.performedBy?.name || "Unknown"}</td>
              <td>{log.patient?.name || "N/A"}</td>
              <td>{log.details}</td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
