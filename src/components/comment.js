import axios from "axios";
import React, { useEffect, useState } from "react";

export default Comment = ({ comment }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL +
          "/comments/" +
          comment.senderId +
          "/fetchUser"
      );
      setUser(res.data);
    };
    getUser();
  }, [comment]);

  console.log(comment)
  return (
    <div>
      <ul>
        <li>
          <h1>{user.username}</h1>
          <p>{comment.text}</p>
        </li>
      </ul>
    </div>
  );
};
