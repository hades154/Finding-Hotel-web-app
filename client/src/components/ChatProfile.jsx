import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/appContext";

function ChatProfile(props) {
  const [userChat, setUserChat] = useState([]);
  const { user } = useAppContext();
  useEffect(() => {
    const userId = props.currentChat.members.find((m) => m !== user._id);
    const getUser = async () => {
      try {
        const res = await axios("/api/users?userId=" + userId);
        setUserChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [props.currentChat]);
  return (
    <div className="chat-title">
      <img src={userChat.user_ava} alt="" />
      <div>{userChat.username}</div>
    </div>
  );
}

export default ChatProfile;
