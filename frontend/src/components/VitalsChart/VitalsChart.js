import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./VitalsChart.css";

// Register ChartJS components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

export default function VitalsChart({ vitals }) {
  // -------------------------------
  // No History Case
  // -------------------------------
  if (!vitals || vitals.length === 0) {
    return (
      <div className="chart-wrapper">
        <p className="no-data">📊 No vitals history recorded yet.</p>
      </div>
    );
  }

  // -------------------------------
  // Labels from "recordedAt"
  // -------------------------------
  const labels = vitals.map((v) =>
    new Date(v.recordedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  // -------------------------------
  // Chart Data
  // -------------------------------
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°F)",
        data: vitals.map((v) => v.temperature || 0),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.18)",
        tension: 0.4,
        pointRadius: 4,
        pointBorderColor: "#ef4444",
        pointBackgroundColor: "#fff",
        borderWidth: 3,
        fill: true,
      },
      {
        label: "Pulse (bpm)",
        data: vitals.map((v) => v.pulse || 0),
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.18)",
        tension: 0.4,
        pointRadius: 4,
        pointBorderColor: "#0ea5e9",
        pointBackgroundColor: "#fff",
        borderWidth: 3,
        fill: true,
      },
      {
        label: "SpO₂ (%)",
        data: vitals.map((v) => v.spo2 || 0),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.18)",
        tension: 0.4,
        pointRadius: 4,
        pointBorderColor: "#10b981",
        pointBackgroundColor: "#fff",
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  // -------------------------------
  // Chart Options
  // -------------------------------
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
            weight: 600,
          },
          color: "#64748b",
          usePointStyle: true,
          padding: 18,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15,23,42,0.95)",
        cornerRadius: 10,
        padding: 12,
        titleFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 13,
          weight: 700,
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 12,
        },
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(226,232,240,0.6)",
          borderDash: [5, 5],
        },
        ticks: {
          font: { family: "'Plus Jakarta Sans'", size: 11, weight: 500 },
          color: "#94a3b8",
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "'Plus Jakarta Sans'", size: 11, weight: 500 },
          color: "#94a3b8",
        },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-container-inner">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
