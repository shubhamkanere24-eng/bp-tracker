import { useEffect,useState } from "react";
import API from "../Services/api";

function HistoryTable(){

  const [data,setData] = useState([]);

  useEffect(()=>{

    fetchHistory();

  },[]);

  const fetchHistory = async()=>{

    try {

      const res = await API.get("/bp/history");

      setData(res.data);

    } catch (err) {

      console.error("Error loading history", err);
      alert(err.response?.data?.message || "Error loading history");

    }

  };

  return(

    <div className="mt-3">

      <div className="d-flex justify-content-end mb-2">
        {data.length > 0 && (
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              if (!window.confirm("Delete all BP records?")) return;
              try {
                await API.delete("/bp/all");
                await fetchHistory();
              } catch (err) {
                console.error("Error deleting all history", err);
                alert(err.response?.data?.message || "Error deleting history");
              }
            }}
          >
            Delete All
          </button>
        )}
      </div>

      <table className="table">

        <thead>

          <tr>
            <th>Date</th>
            <th>Systolic</th>
            <th>Diastolic</th>
            <th>Pulse</th>
            <th></th>
          </tr>

        </thead>

        <tbody>

          {data.map((item)=>(
            <tr key={item._id}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.systolic}</td>
              <td>{item.diastolic}</td>
              <td>{item.pulse}</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={async () => {
                    if (!window.confirm("Delete this record?")) return;
                    try {
                      await API.delete(`/bp/${item._id}`);
                      await fetchHistory();
                    } catch (err) {
                      console.error("Error deleting record", err);
                      alert(err.response?.data?.message || "Error deleting record");
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

}

export default HistoryTable;