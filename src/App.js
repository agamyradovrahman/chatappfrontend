import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

let token

function App() {

  const navigate = useNavigate()


/*  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]); */
 

  if (useSelector(state => state.user.user?._id)) {
    token = true

  } else {
     token = false
  }


  useEffect(() => {
    if (localStorage.getItem("chatapp")) {
      console.log(localStorage.getItem("chatapp"))
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
