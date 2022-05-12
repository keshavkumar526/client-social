import "./Profile.css";
import Topbar from "../../components/top-bar/topbar";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/right-bar/rightbar";
import Sidebar from "../../components/side-bar/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState(false);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const getProfilePic = () => {
    if (user.profilePicture === "") {
      return "/assets/person/noAvatar.png";
    } else {
      return (
        user.profilePicture
      );
    }
  };

  return (
    <>
      <Topbar />
      <div className="ProfileContainer">
        <Sidebar />
        <div className="ProfileRight">
          <div className="ProfileRightTop">
            <div className="ProfileCover">
              <img
                src={user.coverPicture || "/assets/person/noCover.png"}
                alt=""
                className="ProfileCoverImg"
              />
              <img src={getProfilePic()} alt="" className="ProfileImg" />
            </div>
            <div className="ProfileInfo">
              <h4 className="ProfileUsername">{user.username}</h4>
              <span className="ProfileDescription">{user.desc}</span>
            </div>
          </div>
          <div className="ProfileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
