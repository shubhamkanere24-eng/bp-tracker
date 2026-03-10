import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";
import API from "../Services/api";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function BPChart() {

  const [records, setRecords] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {
      try {
        const res = await API.get("/bp/history");
        setRecords(res.data || []);
      } catch (err) {
        console.error("Error loading chart data", err);
      }
    };

    fetchHistory();

  }, []);

  const labels = records.map(r => new Date(r.date).toLocaleDateString());
  const systolicValues = records.map(r => r.systolic);
  const diastolicValues = records.map(r => r.diastolic);

  const data = {
    labels,
    datasets: [
      {
        label: "Systolic",
        data: systolicValues,
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.1)",
        tension: 0.3
      },
      {
        label: "Diastolic",
        data: diastolicValues,
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
        tension: 0.3
      }
    ]
  };

  return (

    <div className="mt-4">

      <h5>BP Trend</h5>

      {records.length === 0 ? (
        <p className="text-muted">No BP readings yet.</p>
      ) : (
        <Line data={data} />
      )}

    </div>

  );
}

export default BPChart;