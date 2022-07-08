import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

function Conversation(props) {
  const [user, setUser] = useState([]);
  const [lastMessage, setLastMessage] = useState([]);

  useEffect(() => {
    const userId = props.conversation.members.find(
      (m) => m !== props.currentUser._id
    );
    const conversationId = props.conversation._id;

    const getUser = async () => {
      try {
        const res = await axios(
          "/api/message?conversationId=" + conversationId + "&userId=" + userId
        );
        setUser(res.data.user);
        setLastMessage(res.data.message);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [props.conversation, props.currentUser]);
  return (
    <div className={`conversation ${props.active ? "active" : ""}`}>
      <img src={user.user_ava} alt="image" />
      <div className="title-text">{user.username}</div>
      <div className="created-date">{format(lastMessage.createdAt)}</div>
      <div className="conversation-message">{lastMessage.text}</div>
    </div>
  );
}

export default Conversation;
