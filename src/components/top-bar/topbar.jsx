import React, { useContext } from "react";
import "./topbar.css";
import { Person, Chat, Notifications, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);

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
    <div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Social Media App</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Link to={"/search/" + user.username}>
              <button className="SearchButton">
                {user.username},Search for Users worldwide!
              </button>
            </Link>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Link to={"/search/" + user.username}>
                <Person />
              </Link>
              <span className="topbarIconBadge">3</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">3</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">5</span>
            </div>
          </div>
          {user && (
            <Link to={"/profile/" + user.username}>
              <img src={getProfilePic()} alt="" className="topbarImg" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
