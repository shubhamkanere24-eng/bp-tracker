import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

function BPForm(){

  const [systolic,setSys] = useState("");
  const [diastolic,setDia] = useState("");
  const [pulse,setPulse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{

    e.preventDefault();
    console.log("BP Save clicked", { systolic, diastolic, pulse });

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/");
      return;
    }

    try{

      const res = await API.post("/bp/add",{
        systolic,
        diastolic,
        pulse
      });

      console.log("BP save response", res.data);
      alert("BP Saved");

    }catch(err){

      console.error("Error saving BP", err);
      alert(err.response?.data?.message || "Error saving BP");

    }

  };

  return(

    <form onSubmit={handleSubmit}>

      <h5>Add BP Reading</h5>

      <input
      className="form-control mb-2"
      placeholder="Systolic"
      onChange={(e)=>setSys(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Diastolic"
      onChange={(e)=>setDia(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Pulse"
      onChange={(e)=>setPulse(e.target.value)}
      />

      <button className="btn btn-success">
      Save
      </button>

    </form>

  );

}

export default BPForm;