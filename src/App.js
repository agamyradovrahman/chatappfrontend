import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";


function App() {



  return (

    <BrowserRouter >
      <Routes>
        <Route path="/home" element={<Login />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>Error 404 Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
