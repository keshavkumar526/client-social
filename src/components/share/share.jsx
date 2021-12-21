import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const NewPost = {
      userId: user._id,
      desc: desc.current.value,
      img:""
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now()+ file.name;
      data.append("file", file);
      data.append("name", fileName);
      NewPost.img = fileName;
      console.log(NewPost);
      try {
        await axios.post(process.env.REACT_APP_API_URL + "/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post(process.env.REACT_APP_API_URL + "/posts", NewPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={ user?.profilePicture || "/assets/person/noAvatar.png"}
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"What's In your Mind  " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancel" onClick={()=> setFile(null)}  />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareOptionIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                id="file"
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareOptionIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareOptionIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions
                htmlColor="goldenrod"
                className="shareOptionIcon"
              />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
