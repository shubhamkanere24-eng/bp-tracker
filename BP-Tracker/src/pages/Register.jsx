import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async(e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("User registered");
      navigate("/");

    } catch(err){

      console.error("Register error", err);
      alert(err.response?.data?.message || "Error registering");

    }

  };

  return(

    <form onSubmit={handleRegister}>

      <h3>Register</h3>

      <input
      className="form-control mb-2"
      placeholder="Name"
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}
      />

      <input
      type="password"
      className="form-control mb-2"
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="btn btn-success">
      Register
      </button>

    </form>

  );

}

export default Register;