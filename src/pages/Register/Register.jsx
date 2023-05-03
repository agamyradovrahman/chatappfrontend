import "./register.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "./../../actions/userauth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errs, setErrs] = useState();
  const [prr, setPrr] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    
    if (localStorage.getItem("chatapp")) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    setPrr()
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://chatapp-backend-rvtt.onrender.com/api/auth/register/",
        {
          username,
          email,
          password,
        }
      );
      if (data.status === true) {
        
      
        setPassword("");
        setUsername("");
        setEmail("");
      } 

      if(data.status === false) {
        setPrr(data)
      }
    } catch (error) {
      
      console.log(error.response.data)
      setErrs(error.response.data)
    }
  };

  return (
    <div className="register">
      <div className="secondcont">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label className="labelstyle">Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="labelstyle">Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="labelstyle">Password</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        {prr?.msg && <div className="errs">{prr?.msg}</div>}
        {errs?.username && <div className="errs">{errs?.username}</div>}
        {errs?.email && <div className="errs">{errs?.email}</div>} 
        <div className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
