import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";


// Login Pages
import AdminLogin from "./pages/Login/AdminLogin";
import DoctorLogin from "./pages/Login/DoctorLogin";
import NurseLogin from "./pages/Login/NurseLogin";

// Admin Dashboard + Subpages
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import StaffPage from "./pages/AdminDashboard/StaffPage";
import LogsPage from "./pages/AdminDashboard/LogsPage";
import PatientsPage from "./pages/AdminDashboard/PatientsPage";

// Doctor & Nurse Dashboards
import DoctorDashboard from "./pages/DoctorDashboard/DoctorDashboard";
import NurseDashboard from "./pages/NurseDashboard/NurseDashboard";

// Other Pages
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import TriageBoard from "./pages/TriageBoard/TriageBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- Public Pages ---------- */}
        <Route path="/" element={<LandingPage />} />

        {/* ---------- Login Routes ---------- */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/nurse-login" element={<NurseLogin />} />

        {/* ---------- Dashboards ---------- */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/nurse" element={<NurseDashboard />} />

        {/* ---------- Admin Sub-pages ---------- */}
        <Route path="/admin/patients" element={<PatientsPage />} />
        <Route path="/admin/staff" element={<StaffPage />} />
        <Route path="/admin/logs" element={<LogsPage />} />

        {/* ---------- Dynamic + Other Pages ---------- */}
        <Route path="/patient/:id" element={<PatientProfile />} />
        <Route path="/triage" element={<TriageBoard />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
