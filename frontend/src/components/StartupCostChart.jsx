import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const parseRange = (rangeString) => {
  const match = rangeString?.match(/[\d,]+/g);
  if (!match) return 0;

  const nums = match.map((n) => parseFloat(n.replace(/,/g, "")));
  return nums.length === 2 ? (nums[0] + nums[1]) / 2 : nums[0];
};

const formatLabel = (key) => {
  return key
    .replace("startup_", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const StartupCostChart = ({ costs }) => {
  if (!costs) return null;

  const startupKeys = Object.keys(costs).filter(
    (key) => key.startsWith("startup_") && key !== "breakdown"
  );

  if (startupKeys.length === 0) {
    return (
      <p style={{ color: "gray" }}>
        No startup cost data available for this business type.
      </p>
    );
  }

  const labels = startupKeys.map(formatLabel);
  const values = startupKeys.map((key) => parseRange(costs[key]));

  const data = {
    labels,
    datasets: [
      {
        label: "Average Startup Cost (USD)",
        data: values,
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#9C27B0",
          "#F44336",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (val) => `$${val.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h3>Startup Cost Comparison</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StartupCostChart;
