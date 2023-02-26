import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

export default Comment = ({ comment }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        "https://api-social-tzy4.onrender.com/api/comments/" +
          comment.senderId +
          "/fetchUser"
      );
      setUser(res.data);
    };
    getUser();
  }, [comment]);

  return (
    <div>
      <p style={{ fontSize: "20px" }}>
        <b style={{ color: "#eb5542", fontWeight: "1000" }}>{user.username}</b>{" "}
        commented on your post <b>AS</b>:
        <b
          style={{
            color: "#d47e1c",
            marginLeft: "35px",
            textDecoration: "underline",
          }}
        >
          {comment.text}
        </b>
        <p
          style={{
            marginLeft: "35px",
            color: "red",
            fontSize: "19px",
            marginTop: "3px",
          }}
        >
          {format(comment.createdAt)}
        </p>
      </p>
      <hr style={{ color: "red" }} />
    </div>
  );
};
