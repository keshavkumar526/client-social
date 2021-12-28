import React, { useContext, useState } from "react";
import axios from "axios";
import { Person, Chat, Notifications, Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./search.css";
import MySearchModal from "../../components/modal/modal";

export default function Search() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const changeSearch = async (e) => {
    if (e.target.value === "") {
      setSearch("");
    } else {
      setSearch(e.target.value);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/posts/search/",
        {
          searchItem: e.target.value,
        }
      );
      setData(response.data);
      setShowModal(!showModal);
    }
  };
  const handleModal = () => {
    setShowModal(false);
  };

  const getProfilePic = () => {
    if (user.profilePicture === "") {
      return "/assets/person/noAvatar.png";
    } else {
      return (
        process.env.REACT_APP_IMAGES_URL + "/images/post/" + user.profilePicture
      );
    }
  };

  const getSearchProfilePic = (d) => {
    if (d.profilePicture === "") {
      return "/assets/person/noAvatar.png";
    } else {
      return (
        process.env.REACT_APP_IMAGES_URL + "/images/post/" + d.profilePicture
      );
    }
  };

  return (
    <div className="SearchTopBarContainer">
      <div className="topbarContainerr">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Social Media App</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="searchbar"
          >
            <Cancel onClick={handleModal} />
            <input
              placeholder="Search for friends posts and videos"
              className="searchInput"
              value={search}
              onChange={changeSearch}
            />
          </form>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Link to="/search">
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
      <div className="searchBottom">
        {data.map((d) => (
          <MySearchModal
            profilePicture={getSearchProfilePic(d)}
            username={d.username}
            setIsShow={setShowModal}
            isShow={showModal}
          />
        ))}
      </div>
      <div class="module top">
        <h1>{user.username}, search for users Worldwide!</h1>
      </div>
    </div>
  );
}
