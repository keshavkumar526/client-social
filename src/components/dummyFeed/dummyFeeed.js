import { MoreVert } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertCommentIcon from "@mui/icons-material/InsertComment";


const DummyFeed = ({profilePic,username,desc,post,date,comment,like}) => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
              <img
                src={profilePic}
                alt=""
                className="postProfileImg"
              />
            <span className="postUsername">{username}</span>
            <span className="postDate">{date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="postIcon"/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{desc}</span>
          <img
            src={post}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <div className="star-container">
              <FavoriteBorderIcon style={{fill: "red"}} size="2em" fontSize="inherit"  />
            </div>
            <span className="postLikeCounter">{like} likes </span>
          </div>
          <div className="postBottomRight">
          <InsertCommentIcon style={{outline: "none"}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DummyFeed;
