import "./modal.css";
import { Link } from "react-router-dom";

function MySearchModal(props) {
  return (
    <div className="SearchModal">
      <div className="SearchBelow">
        <Link
          to={"/profile/" + props.username}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              props.profilePicture ||
              process.env.REACT_APP_IMAGES_URL + "/images/person/noAvatar.png"
            }
            alt=""
            className="postProfileImg"
          />
          <span className="postUsername">{props.username}</span>
        </Link>
      </div>
    </div>
  );
}
export default MySearchModal;


