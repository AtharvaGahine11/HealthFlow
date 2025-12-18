<div align="center">


  <h1 style="font-size: 3rem; color: #0f172a; margin-bottom: 10px;">HealthFlow</h1>
  
  <p style="font-size: 1.2rem; color: #64748b; max-width: 600px;">
    <b>Smarter Healthcare, Real-Time Precision.</b><br>
    A Premium SaaS-style Hospital Management & Triage System.
  </p>

  <p>
    <a href="#-key-features">
      <img src="https://img.shields.io/badge/Role-Admin%20%7C%20Doctor%20%7C%20Nurse-0ea5e9?style=for-the-badge" alt="Roles" />
    </a>
    <a href="#-tech-stack">
      <img src="https://img.shields.io/badge/Tech-React%20%7C%20Node%20%7C%20Socket.io-0f172a?style=for-the-badge" alt="Tech Stack" />
    </a>
    <a href="#-uiux-design">
      <img src="https://img.shields.io/badge/Design-Glassmorphism%20%26%20Animations-10b981?style=for-the-badge" alt="Design" />
    </a>
  </p>

</div>

<br />

---

## 📖 **Project Overview**

**HealthFlow** is a modern, real-time healthcare coordination platform designed to streamline hospital operations. It replaces outdated legacy systems with a **premium UI/UX**, offering role-based dashboards, instant triage updates, and live vitals monitoring.

The system is built with a focus on **visual hierarchy, smooth animations, and glassmorphism**, ensuring that medical professionals can process critical information with zero friction.

<br />

## 🚀 **Key Features**

<table width="100%">
  <tr>
    <td width="33%" valign="top">
      <h3 align="center">🧠 Admin Portal</h3>
      <ul>
        <li><b>Global Dashboard:</b> Real-time stats on patient flow, active staff, and hospital capacity.</li>
        <li><b>Staff Management:</b> Add/Remove Doctors and Nurses with ease.</li>
        <li><b>Triage Oversight:</b> Monitor the master Triage Board and override priorities if needed.</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3 align="center">🩺 Doctor Portal</h3>
      <ul>
        <li><b>My Patients:</b> View only patients assigned to you.</li>
        <li><b>Live Vitals:</b> Real-time updates via WebSockets (Socket.io).</li>
        <li><b>Clinical Notes:</b> Add/View chronological medical notes for patient history.</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3 align="center">👩🏻‍⚕️ Nurse Portal</h3>
      <ul>
        <li><b>Triage Entry:</b> Rapidly intake patients and assign urgency (Critical, Urgent, Stable).</li>
        <li><b>Vitals Update:</b> Quick-access modals to update BP, Pulse, Temp, and SpO2.</li>
        <li><b>Workflow:</b> Manage room assignments and patient flow.</li>
      </ul>
    </td>
  </tr>
</table>

<br />

## 🎨 **UI/UX Design Highlights**

This project isn't just about function; it's about **feeling**. We've implemented a "Premium SaaS" aesthetic:

* **✨ Glassmorphism:** Cards and sidebars use a frosted glass effect (`backdrop-filter: blur`) for depth.
* **🌊 Animations:** * *Entrance Animations:* Elements cascade in (`fadeUp`, `slideIn`) for a smooth load.
    * *Micro-interactions:* Buttons shine on hover, cards float up when interacted with.
    * *Live Charts:* `Chart.js` graphs draw themselves smoothly with gradient fills.
* **🏥 Triage Board:** A visual Kanban-style board that highlights critical patients with a "pulse" animation.

<br />

## 🛠️ **Tech Stack**

* **Frontend:** React.js, React Router v6
* **Styling:** CSS3 (Variables, Keyframes, Flexbox/Grid)
* **State/Data:** Axios, React Hooks (`useState`, `useEffect`)
* **Real-Time:** Socket.io-client
* **Visualization:** Chart.js, React-Chartjs-2
* **Icons:** React Icons (FontAwesome)

<br />

## 💻 **Installation & Setup**

Follow these steps to run the project locally.

### **1. Clone the Repository**
```bash
git clone [https://github.com/your-username/healthflow.git](https://github.com/your-username/healthflow.git)
cd healthflow
