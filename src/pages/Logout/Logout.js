import React, { useState, useEffect } from "react";
import "./Logout.css";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutSecondUser, LogoutUser, Renameuser } from "./../../actions/userauth";
import { ClearPost } from "./../../actions/post";
import AddFriend from "./../AddFriend/AddFriend";
import Rename from "../Rename/Rename";

const Logout = ({ showw }) => {
  const hiddenFileInput = React.useRef(null);
  const hiddenFileInput1 = React.useRef(null);

  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const avatar = useSelector((state) => state.user.user.avatar);

  const userid = user._id;

  const handleClick = async () => {
    try {
      setSidebar(false);
      if (show === true) {
        setShow(false);
      } else {
        setShow(true);
      }
      /*  const data = await axios.get(`http://localhost:5000/api/auth/logout/`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }) 

            dispatch(LogoutUser());
            dispatch(ClearPost());

            navigate("/login")
            console.log(data) */
    } catch (error) {
      console.log(error);
    }
  };

  const yesClick = async () => {
    try {
      const data = await axios.get(`https://chatapp-backend-rvtt.onrender.com/api/auth/logout/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      dispatch(LogoutUser());
      dispatch(ClearPost());
      dispatch(LogoutSecondUser())

      navigate("/login");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const noClick = async () => {
    setShow(false);
    setSidebar(true);
  };

  const profileClick = () => {
    if (sidebar === true) {
      setSidebar(false);
      console.log("false");
    } else {
      setSidebar(true);
      console.log("true");
    }
  };

  useEffect(() => {
    if (showw === true) {
      setSidebar(false);
    }
  }, [showw]);


  

  const handleClick1 = async () => {
    await hiddenFileInput.current.click();
    console.log(image)
  };


  const handleClick2 = async () => {
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      console.log(formData)

      const res = await axios({
        // Endpoint to send files
        url: "https://chatapp-backend-rvtt.onrender.com/api/upload/img",
        method: "POST",
        
        data: formData,
      }) 
 

      const urll = res.data.url;
      console.log(res); 

      
      
      console.log(res.data.url);

      /*
      const red = await axios.put(
        `http://localhost:5000/api/auth/user/uploadavatar`,
        { userid, url: urll }
      );

      console.log(red);

      if (red.data.status) {
        dispatch(Renameuser(red.data.user));
      }  */
    } catch (error) {
      console.log(error);
    }
  }; 


  return (
    <>
      {show && (
        <div className="logoutsure">
          <div className="logoutsurestyle">
            <div className="logoutbaslyk">Dou you want Log out</div>
            <div className="logouticons">
              <div className="logoutyes" onClick={() => yesClick()}>
                <div className="logoutyazy">YES</div>
              </div>
              <div className="logoutno" onClick={() => noClick()}>
                <div className="logoutyazy">NO</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {sidebar ? (
        <div className="logoutcontrue">
          <div className="profileheadstyle">
            <BiArrowBack
              className="backsignstyle"
              onClick={() => profileClick()}
            />
            <div className="profiletext">Profile</div>
          </div>
          <div className="avatarstyle">
            <div className="avatarimagestyle">
              <img className="avatarimage" src={avatar} alt=""/>
            </div>
            <div className="edityourphotostyle">
              <div style={{display: "flex", flex:1, paddingRight: 20}} onClick={handleClick1}>
                <div>Choose File</div>
              </div>
              <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{display: 'none'}}
                />

              <div ref={hiddenFileInput1}  onClick={handleClick2}>Upload</div>
            </div>
          </div>
          <div className="addfriendstyle">
            <div className="addfriendtext">Add Friend</div> 
            <AddFriend />
          </div>
          <div className="addfriendstyle">
            <div className="addfriendtext">Change name</div>
            <Rename />
          </div>

          <div className="logoutt">
            <div className="logoutttext" onClick={() => handleClick()}>
              logout
            </div>
          </div>
        </div>
      ) : (
        <div className="logoutcont">
          <div className="usercont">
            <div className="profilestyle" onClick={() => profileClick()}>
              <img className="profilestyleimage" src={avatar} alt="" />
            </div>
            <div className="usernamecont">{user.username}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
