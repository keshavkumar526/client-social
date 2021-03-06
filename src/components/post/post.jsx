import "./post.css";
import { MoreVert } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/AuthContext";
import MyModal from "../modalLike";
import MyCommentModal from "../commentModal";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: username } = useContext(AuthContext);
  const [isDelete, setIsDelete] = useState(false);
  const [likedUser, setLikedUser] = useState([]);
  const [postComment, setPostComment] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(username._id));
  }, [post.likes, username._id]);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const toggleModal = () => {
    setToggle(!toggle);
  };
  const toggleLikeModal = () => {
    setToggleLike(!toggleLike);
  };

  const commentModalHandler = async (e) => {
    e.preventDefault();
    await axios.put(
      process.env.REACT_APP_API_URL + "/comments/" + post._id + "/comment",
      { comment: postComment, userId: username?._id }
    );
    setPostComment("");
  };

  const inputForm = (e) => {
    setPostComment(e.target.value);
  };

  const likeHandler = async (id) => {
    await axios.put(
      process.env.REACT_APP_API_URL + "/posts/" + post._id + "/like",
      { userId: username?._id }
    );

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/posts/show/",
      {
        showItem: id,
      }
    );
    setLikedUser(response.data);
  };
  const deleteHandler = () => {
    setIsDelete(!isDelete);
  };

  const postDeleteHandler = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_API_URL + "/posts/" + post.userId + "/delete",
        {
          userId: username?._id,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const getProfilePic = () => {
    if (username.profilePicture === "") {
      return "/assets/person/noAvatar.png";
    } else {
      return (
         username.profilePicture
      );
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={"/profile/" + user.username}>
              <img src={getProfilePic()} alt="" className="postProfileImg" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="postIcon" onClick={deleteHandler} />
          </div>
          {isDelete && (
            <div className="deleteContainer">
              <button className="userLogOutButton" onClick={postDeleteHandler}>
                Delete Post
              </button>
            </div>
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            src={post.img}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <div className="star-container">
              <FavoriteBorderIcon
                size="2em"
                fontSize="inherit"
                onClick={() => likeHandler(post._id)}
              />
            </div>
            <span className="postLikeCounter">{like} likes </span>
            <button className="viewLikesButton" onClick={toggleLikeModal}>
              View Likes
            </button>
            <button className="viewLikesButton" onClick={toggleModal}>
              ViewComments
            </button>
            <MyModal
              isOpen={toggleLike}
              toggleModal={toggleLikeModal}
              LikedUsers={likedUser}
              Post={post}
            />
            <MyCommentModal
              isOpen={toggle}
              toggleModal={toggleModal}
              post={post}
            />
          </div>
          <div className="postBottomRight">
            <button
              className="postCommentButton"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              <InsertCommentIcon style={{ outline: "none" }} />
            </button>
            {showCommentForm && (
              <form onSubmit={commentModalHandler}>
                <input
                  placeholder="Wlcm!type your Comment"
                  type="text"
                  value={postComment}
                  onChange={inputForm}
                  className="commentInput"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "scripts": {
//   "dev": "react-scripts start",
//   "start": "serve -s build",
//   "build": "react-scripts build",
//   "test": "react-scripts test --env=jsdom",
//   "eject": "react-scripts eject",
//   "heroku-postbuild": "npm run build"
// },