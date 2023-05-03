import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";
import { useState } from "react";


function App() {
  const [authh, setAuthh] = useState(false)

  useEffect(async () => {
    const dataaa = await JSON.parse(
      localStorage.getItem("chatapp")
    );

    if(dataaa){
      dispatch(LoginUser(dataaa))
      setAuthh(true)
    } else {
      console.log("user is not exist");
    } 
  }, []);

  return (

    <BrowserRouter >
      <Routes>
        <Route path="/" element={authh ? <Home /> : <Login />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>Error 404 Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
