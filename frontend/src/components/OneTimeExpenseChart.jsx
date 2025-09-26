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

const extractLabelAndAverage = (text) => {
  const match = text.match(/(.+?)\s*\((\$?[\d,]+)\s*-\s*(\$?[\d,]+)\)/);
  if (!match) return { label: text, value: 0 };

  const label = match[1].trim();
  const min = parseFloat(match[2].replace(/[^0-9.]/g, "").replace(/,/g, ""));
  const max = parseFloat(match[3].replace(/[^0-9.]/g, "").replace(/,/g, ""));
  const average = (min + max) / 2;
  return { label, value: average };
};

const OneTimeExpensesChart = ({ breakdown }) => {
  if (!breakdown || !Array.isArray(breakdown.one_time_expenses)) return null;

  const dataPoints = breakdown.one_time_expenses.map(extractLabelAndAverage);

  const data = {
    labels: dataPoints.map((d) => d.label),
    datasets: [
      {
        label: "Avg One-Time Cost (USD)",
        data: dataPoints.map((d) => d.value),
        backgroundColor: "#3f51b5",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (val) => `$${val.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h3>One-Time Expense Breakdown</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OneTimeExpensesChart;
