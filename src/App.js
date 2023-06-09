import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";
import { LoginUser } from "./actions/userauth";
import { useDispatch } from "react-redux";


function App() {
  const [authh, setAuthh] = useState()
  const dispatch = useDispatch();

  useEffect(async () => {
    const dataaa = await JSON.parse(
      localStorage.getItem("chatapp")
    );

    if(dataaa){
      dispatch(LoginUser(dataaa))
      setAuthh(true)
    } else {

      setAuthh(false)
    } 
  }, [setAuthh]);

  return (

    <BrowserRouter >
      <Routes>
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Error 404 Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
