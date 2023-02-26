import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/share";
import axios from "axios";
import Post from "../post/post";
import { AuthContext } from "../../context/AuthContext";
import DummyFeed from "../dummyFeed/dummyFeeed";
import { Users } from "../../dummyData";

export default function Feed({ username, isProfile }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(
            "https://api-social-tzy4.onrender.com/api/posts/profile/" + username
          )
        : await axios.get(
            "https://api-social-tzy4.onrender.com/api/posts/timeline/" +
              user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user]);
  console.log(isProfile);

  return (
    <div className="Feed">
      {(!username || username === user?.username) && <Share />}
      <div className="Feedddd">
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>

      {Users.map((u) => (
        <DummyFeed
          key={u.id}
          profilePic={u.profilePicture}
          username={u.username}
          desc={u.desc}
          post={u.photo}
          date={u.date}
          comment={u.comment}
          like={u.like}
        />
      ))}
    </div>
  );
}
