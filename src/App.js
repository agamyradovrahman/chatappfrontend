import { useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";
import { LoginUser } from "./actions/userauth";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();

  useEffect(async () => {
    const dataaa = await JSON.parse(
      localStorage.getItem("chatapp")
    );

    if(dataaa){
      console.log(dataaa)
      dispatch(LoginUser(dataaa))
    } else {
      console.log("user is not exist");
    }
  }, []);



  return (

    
    
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
