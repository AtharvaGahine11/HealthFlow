import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler // Imported Filler for area background effects if needed
} from "chart.js";
import "./VitalsChart.css";

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
  if (!vitals || vitals.length === 0) {
    return (
      <div className="chart-wrapper">
        <p className="no-data">No vitals history recorded yet.</p>
      </div>
    );
  }

  // X-axis labels (times)
  const labels = vitals.map((v) =>
    new Date(v.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°F)",
        data: vitals.map((v) => v.temperature),
        borderColor: "#ef4444", // Red (Critical color)
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4, // Smooth curve
        pointRadius: 4,
        pointBackgroundColor: "#ef4444",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        borderWidth: 3
      },
      {
        label: "Pulse (bpm)",
        data: vitals.map((v) => v.pulse),
        borderColor: "#3b82f6", // Blue (Primary color)
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        borderWidth: 3
      },
      {
        label: "SpO2 (%)",
        data: vitals.map((v) => v.spo2),
        borderColor: "#10b981", // Teal/Green (Stable color)
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#10b981",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        borderWidth: 3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows height to adapt
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          font: { family: "'Outfit', sans-serif", size: 12, weight: 600 },
          usePointStyle: true,
          boxWidth: 8,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { family: "'Outfit', sans-serif", size: 13 },
        bodyFont: { family: "'Outfit', sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 10,
        displayColors: true
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.04)', // Very subtle grid
          drawBorder: false,
        },
        ticks: {
          font: { family: "'Outfit', sans-serif", size: 11 },
          color: '#94a3b8'
        }
      },
      x: {
        grid: {
          display: false, // Hide X grid for cleaner look
        },
        ticks: {
          font: { family: "'Outfit', sans-serif", size: 11 },
          color: '#94a3b8'
        }
      }
    }
  };

  return (
    <div className="chart-wrapper">
      <div style={{ height: "300px" }}> {/* Fixed height container for Chart.js */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
}