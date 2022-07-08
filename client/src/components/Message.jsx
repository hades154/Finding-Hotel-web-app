import React from "react";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";

function Message(props) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/api/users?userId=" + props.message.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [props.conversation, props.currentUser]);

  return (
    <div className="message-row">
      <div className={props.own ? "you-message" : "other-message"}>
        <div className="message-content">
          {!props.own && <img src={user.user_ava} alt="image" />}
          <div className="message-text">{props.message.text}</div>
          <div className="message-time">{format(props.message.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
