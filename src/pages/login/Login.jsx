import "./login.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../actions/userauth";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user?.id);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passeye, setPasseye] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [err, setErr] = useState("");


  useEffect(async () => {
    const dataaa = await JSON.parse(
      localStorage.getItem("chatapp")
    );

    if(dataaa){
      dispatch(LoginUser(dataaa))
    } else {
      console.log("user is not exist");
    } 
  }, []);

  useEffect(() => {
    if (localStorage.getItem("chatapp")) {
      navigate("/home");
    }
  }, []);


  const handleClick = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "https://chatapp-backend-rvtt.onrender.com/api/auth/login/",
      {
        username,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(data);

    if (data.status === true) {
      localStorage.setItem(
        "chatapp",
        JSON.stringify(data)
      );
      dispatch(LoginUser(data)); 
      setPassword("");
      setUsername("");

      navigate("/home");
    } else {
      setErr(data.msg);
    }
  };



  const handleToggle = () => {
    if (passeye === "password") {
      setPasseye("text");
      setIcon(eye);
    } else {
      setPasseye("password");
      setIcon(eyeOff);
    }
  };

  return (
    <div className="login">
      <div className="secondcont">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleClick}>
          <label className="labelstyle">Username</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="labelstyle">Password</label>
          <div className="logineye">
            <input
              type={passeye}
              className="loginInputt"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={handleToggle}>
              <Icon className="eyeicon" icon={icon} size={25} />
            </span>
          </div>
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
        <div className="errstyle">{err}</div>
        <div className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
