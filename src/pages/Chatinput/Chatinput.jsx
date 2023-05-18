import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import "./Chatinput.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AddPost } from "../../actions/post";

const Chatinput = ({ too, socket }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const from = useSelector((state) => state.user.user._id);
  const dosuser = useSelector((state) => state.seconduser?.friend);

  const useridd = useSelector((state) => state.user?.user?._id);

  const handleClick = async () => {
    console.log(from);
    console.log(too);
    try {
      const data = await axios.post(
        "https://chatapp-backend-rvtt.onrender.com/api/msg/addmsgs/",
        {
          from,
          too,
          message,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data)
      socket.current.emit("send-msg", {
        to: too,
        from: from,
        msg: message,
      });
      dispatch(AddPost({ from, too, message }));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
 
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg)
        dispatch(AddPost({ from: dosuser._id, too: useridd, message: msg }));
      });
    }
  }, []);


  const handleKeyDown = async (event) => {
    console.log("pressed after enter first")
    if(event.key=== "Enter") {
      console.log("pressed enter")
      handleClick()
    }
  }

  return (
    <div className="chatInput">
      <input
        type="text"
        className="inputtext"
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      <div className="chaticon" onClick={() => handleClick()}>
        <FiSend className="icon" />
      </div>
    </div>
  );
};

export default Chatinput;
