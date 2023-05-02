import "./home.css";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cons, DeleteCon } from "../../actions/conn";
import Conversation from "./../Conversation/Conversation";
import { seconduser } from "../../actions/seconduser";
import Chatinput from "../Chatinput/Chatinput";
import { AddPost, ClearPost, fetchPosts } from "./../../actions/post";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Logout from "./../Logout/Logout";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { LoginUser, LogoutSecondUser } from "../../actions/userauth";

function Home() {
  const [showw, setShoww] = useState(false);
  const navigate = useNavigate();

  const scrollRef = useRef();
  const socket = useRef();
  const [frien, setFrien] = useState([]);
  const [friendid, setFriendid] = useState("");
  const postlar = useSelector((state) => state.posts?.posts);

  const user = useSelector((state) => state.user?.user);
  const conslar = useSelector((state) => state.con?.posts);

  const dosuser = useSelector((state) => state.seconduser?.friend);

  const useridd = useSelector((state) => state.user?.user?._id);

  const dispatch = useDispatch();


  console.log(useridd);

  useEffect(() => {
    dispatch(cons(user?._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (user) {
      socket.current = io("https://chatapp-backend-rvtt.onrender.com");
      socket.current.emit("add-user", user?._id);
    }
  }, [user]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        dispatch(AddPost({ from: dosuser._id, too: useridd, message: msg }));
      });
    }
  }, []);

  const onChange = (con) => {
    setFrien(con);
    setFriendid(con.users.find((element) => element !== user._id));
    console.log(friendid);
  };

  useEffect(() => {
    if (user?._id) {
      if (friendid) {
        dispatch(fetchPosts(useridd, friendid));
      }
    }
  }, [useridd, friendid, dispatch, frien, user?._id]);

  useEffect(() => {
    dispatch(seconduser(friendid));
  }, [friendid, dispatch]);

  /* useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg)
        dispatch(AddPost({ from:friendid, too:useridd, message: msg }));
      });
    } 
  }, [friendid,useridd, dispatch]); */

  useEffect(() => {
    scrollRef.current?.scrollIntoView({});
  }, [postlar]);

  useEffect(() => {
    if (!useridd) {
      console.log("does not exist user");
      navigate("/login");
    }
  }, [navigate, useridd]);

  const deleteClick = async () => {
    setShoww(true);
  };

  const yesClick = async () => {
    try {
      console.log(useridd);
      console.log(friendid);
      const res = await axios.post(
        `https://chatapp-backend-rvtt.onrender.com/api/cons/delcon`,
        {
          user1: useridd,
          user2: friendid,
        }
      );

      if (res.data.status === true) {
        dispatch(DeleteCon({ user1: useridd, user2: friendid }));
        dispatch(LogoutSecondUser());
        dispatch(ClearPost());
      }

      setShoww(false);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const noClick = async () => {
    setShoww(false);
  };

  return (
    <>
      {showw && (
        <div className="delconsure">
          <div className="delconsurestyle">
            <div className="delconbaslyk">Dou you want to delete Chat</div>
            <div className="delconicons">
              <div className="delconyes" onClick={() => yesClick()}>
                <div className="delconyazy">YES</div>
              </div>
              <div className="delconno" onClick={() => noClick()}>
                <div className="delconyazy">NO</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="esascont">
        <div className="bigcontainer">
          <div className="container">
            <div className="container1">
              <div>
                <Logout showw={showw} />
              </div>
              <div>
                {conslar.map((con, index) => {
                  return (
                    <div key={index} onClick={() => onChange(con)}>
                      <Conversation
                        con={con}
                        index={index}
                        user={user}
                        friend={frien}
                      />
                    </div>
                  );

                  /*  <div className="contactbox" key={con._id}>
                <div className="contactname">{con.users.find(element => element !== user._id)}</div>
              </div>  */
                })}
              </div>
            </div>

            <div className="container2">
              <div className="chatuserstyle">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  {dosuser?.avatar && (
                    <img className="progimage" src={dosuser?.avatar} alt="" />
                  )}
                </div>
                <div className="secondusernamestyle">{dosuser?.username}</div>
                <div className="deleteiconstyle">
                  {dosuser?.avatar && (
                    <RiDeleteBinLine
                      className="deleteiconn"
                      onClick={() => deleteClick()}
                    />
                  )}
                </div>
              </div>
              <div className="chatcontainer">
                {postlar &&
                  postlar.map((post) => {
                    return (
                      <div
                        className={
                          useridd === post.sender ? "messagebox" : "messageboxx"
                        }
                        ref={scrollRef}
                        key={uuidv4()}
                      >
                        <p className="messagename">{post.message}</p>
                      </div>
                    );
                  })}
              </div>
              <div className="sendmessagecontainer">
                {dosuser.username && (
                  <Chatinput too={friendid} socket={socket} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
