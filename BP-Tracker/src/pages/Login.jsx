import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/api";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async(e)=>{

    e.preventDefault();

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      navigate("/dashboard");

    }catch(err){

      console.error("Login error", err);
      alert(err.response?.data?.message || "Invalid login");

    }

  };

  return(

    <div>

      <form onSubmit={handleLogin}>

        <h3>Login</h3>

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

        <button className="btn btn-primary">
        Login
        </button>

      </form>

      <p className="mt-3">
        Don't have an account?{" "}
        <Link to="/register">Create one</Link>
      </p>

    </div>

  );

}

export default Login;