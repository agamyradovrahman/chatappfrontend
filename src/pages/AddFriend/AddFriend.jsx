import "./AddFriend.css";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AddCon } from "../../actions/conn";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFriend = () => {
  const dispatch = useDispatch();
  const [user2, setUser2] = useState("");

  const user1 = useSelector((state) => state.user.user._id);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://chatapp-backend-rvtt.onrender.com/api/cons/addcon/",
        {
          user1,
          user2, 
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );


      if (data.data.status=== true) {
        const res = await axios.get(`https://chatapp-backend-rvtt.onrender.com/api/auth/singleuser/${user2}`)

        dispatch(AddCon({ user1, user2: res.data.user._id}));
        setUser2("");
      }

      if(data.data.status === false) {
        toast(data.data.msg);
      }
      


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="cont">
        <input
          className="continput"
          type="text"
          placeholder="Enter username"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
        />
        <div className="Plus" onClick={(e) => handleClick(e)}>
          <FiPlus className="Plusstyle" />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddFriend;
