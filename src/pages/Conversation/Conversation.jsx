import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Conversation.css";
import { DeleteCon } from "./../../actions/conn";

export default function Conversation({ con, user, friend }) {
  const [show, setShow] = useState(false);
  const [userr, setUserr] = useState();

  const seconduserid = con?.users?.find((element) => element !== user._id);
  const useridd = useSelector((state) => state.user?.user?._id);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://chatapp-backend-rvtt.onrender.com/api/auth/getsingleuser/${seconduserid}`
        );
        setUserr(res.data.user);

      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user, con, seconduserid]);


  const yesClick = async () => {
    try {
      const res = await axios.post(`https://chatapp-backend-rvtt.onrender.com/api/cons/delcon`, {
        user1: useridd,
        user2: seconduserid,
      });

      if (res.data.status === true) {
        dispatch(DeleteCon({ user1: useridd, user2: seconduserid }));
      }

      setShow(false);

    } catch (error) {
      console.log(error);
    }
  };

  const noClick = async () => {
    setShow(false);
  };


  return (
    <>
      {show && (
        <div className="delconsure">
          <div className="delconsurestyle">
            <div className="delconbaslyk">Dou you want Log out</div>
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
      <div
        className={`${friend === con ? "selected" : "notselected"}`}
        key={con._id}
      >
      
        <div className="contactname">{userr?.username}</div>
      </div>
    </>
  );
}
