import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BPForm from "../components/BPForm";
import BPChart from "../components/BPChart";
import MedicineReminder from "../components/MedicineReminder";

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

  }, [navigate]);

  return (

    <div>

      <h3>Dashboard</h3>

      <BPForm />

      <BPChart />

      <MedicineReminder />

    </div>

  );
}

export default Dashboard;