import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Online from "../online/online";
import { Users } from "../../dummyData";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { useRef } from "react";

export default function RightBar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: curruntUser, dispatch } = useContext(AuthContext);
  const [isUpdate, setIsUpdate] = useState(false);

  const City = useRef();
  const From = useRef();
  const Relationship = useRef();
  const Desc = useRef();

  const [followed, setFollowed] = useState(
    curruntUser.following?.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get(process.env.REACT_APP_API_URL + "/users/getUser/" + user._id);
        setFriends(friendsList.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      getFriends();
    }
  }, [user]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(process.env.REACT_APP_API_URL + "/users/" + user._id + "/unfollow", {
          userId: curruntUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(process.env.REACT_APP_API_URL + "/users/" + user._id + "/follow", {
          userId: curruntUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        setFollowed(!followed);
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };
  const LogOutHandler = () => {
    sessionStorage.removeItem("user");
  };

  const ShowUpdateComponent = () => {
    setIsUpdate(!isUpdate);
  };

  const UpdateProfileHandler = () => {
    try {
      axios.put(process.env.REACT_APP_API_URL + "/users/" + user._id, {
        userId: curruntUser?._id,
        city: City.current.value,
        from: From.current.value,
        relationship: Relationship.current.value,
        desc: Desc.current.value,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setIsUpdate(!isUpdate);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src={process.env.REACT_APP_IMAGES_URL +"/images/post/gift.png"}
            alt=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>three others</b> have birthday today
          </span>
        </div>
        <img
          src={process.env.REACT_APP_IMAGES_URL +"/images/post/ad.png"}
          alt=""
          className="rightBarAdd"
        />
        <h4 className="rightBartitle">Online Friends</h4>
        <ul className="rightBarFriendsList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== curruntUser.username && (
          <button className="rightBarFollowButton" onClick={followHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="RightBarTitle">User Infomation</h4>
        <div className="RightBarInfo">
          <div className="RightBarInfoItem">
            <span className="RightBarInfoKey">City:</span>
            <span className="RightBarInfoValue">{user.city}</span>
          </div>
          <div className="RightBarInfoItem">
            <span className="RightBarInfoKey">From:</span>
            <span className="RightBarInfoValue">{user.from}</span>
          </div>
          <div className="RightBarInfoItem">
            <span className="RightBarInfoKey">RelationShip:</span>
            <span className="RightBarInfoValue">
              {user.relationship === 0
                ? "Single"
                : user.relationship === 1
                ? "Complicated"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
          {curruntUser.username === user.username && (
            <div className="updateContainer">
              <button
                className="userLogOutButton"
                onClick={ShowUpdateComponent}
              >
                Change Your Profile
              </button>
              {isUpdate && (
                <form className="updateForm" onSubmit={UpdateProfileHandler}>
                  <input
                    type="text"
                    ref={City}
                    required
                    placeholder="City"
                    className="inputUsername"
                  />
                  <input
                    type="text"
                    required
                    ref={From}
                    placeholder="From"
                    className="inputUsername"
                  />
                  <input
                    required
                    type="text"
                    ref={Relationship}
                    placeholder="Relationship"
                    className="inputUsername"
                  />
                  <input
                    required
                    type="text"
                    ref={Desc}
                    placeholder="Description"
                    className="inputUsername"
                  />
                  <button type="submit" className="userLogOutButton">
                    Update My Profile
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
        <h4 className="RightBarTitle">User Friends</h4>
        <div className="RightBarFollowings">
          {friends.map((friend) => (
            <div className="RightBarFollowing">
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={friend.profilePicture || "/assets/person/noAvatar.png"}
                  alt=""
                  className="RightBarFollowingImg"
                />
              </Link>
              <span className="RightBarFollowingName">{friend.username}</span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>

      <div className="logOutContainer">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="userLogOutButton" onClick={LogOutHandler}>
            LogOut
          </button>
        </Link>
      </div>
    </div>
  );
}
