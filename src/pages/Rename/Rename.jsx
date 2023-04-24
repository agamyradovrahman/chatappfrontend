import "./Rename.css";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Renameuser } from "../../actions/userauth";

const Rename = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("")

  const user1 = useSelector((state) => state.user.user._id);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        const data = await axios.put(
            "http://localhost:5000/api/auth/user/rename",
            {
              userid: user1,
              newusername: user, 
            },
          );

          if (data.data.status=== true) {
            dispatch(Renameuser(data.data.user))
            setUser("");
          }
    
          if(data.data.status === false) {
            toast(data.data.msg);
          }

        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }
   
  return (
    <div>
      <div className="cont">
        <input
          className="continput"
          type="text"
          placeholder="Enter new username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <div className="Plus" onClick={(e) => handleClick(e)}>
          <BiPencil className="Plusstyle" />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}; 

export default Rename;
