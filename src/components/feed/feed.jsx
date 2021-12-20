import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/share";
import axios from "axios";
import Post from "../post/post";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(process.env.REACT_APP_API_URL + "/posts/profile/" + username)
        : await axios.get(process.env.REACT_APP_API_URL + "/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user]);

  return (
    <div className="Feed">
      { (!username || username === user?.username) && <Share />}

      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
