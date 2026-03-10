import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HistoryTable from "../components/HistoryTable";

function History() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

  }, [navigate]);

  return (

    <div>

      <h3>BP History</h3>

      <HistoryTable />

    </div>

  );
}

export default History;