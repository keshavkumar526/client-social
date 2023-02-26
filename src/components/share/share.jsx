import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { UseFullPageLoading } from "../loading/useFullPageLoading";

export default function Share() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const desc = useRef();
  const [loader, loaderState, showLoader, hideLoader] = UseFullPageLoading();

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const shareHandler = () => {
      if (file) {
        setShowShare(true);
      }
    };
    shareHandler();
  }, [file]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    let url;
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    url = await uploadImage(reader.result);
    const NewPost = {
      userId: user._id,
      desc: desc.current.value,
      img: url,
    };
    try {
      await axios.post(
        "https://api-social-tzy4.onrender.com/api/posts",
        NewPost
      );
      window.location.reload();
      hideLoader();
    } catch (err) {
      console.log(err);
    }
  };
  const uploadImage = async (base64EncodedImage) => {
    console.log(selectedFile);
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "myfolder");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dgzbiek2i/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
      return file.url;
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };

  // const config = { headers: { "Content-Type": "application/json" } };
  // const encodedData = JSON.stringify(base64EncodedImage);
  // const res = await axios.post(
  //   process.env.REACT_APP_API_URL + "/posts/upload",
  //   {
  //     data: encodedData,
  //   }
  // );
  // const res = await fetch(process.env.REACT_APP_API_URL + "/posts/upload", {
  //   method: "POST",
  //   body: JSON.stringify({ data: base64EncodedImage, userId: user._id }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const NewPost = {
  //     userId: user._id,
  //     desc: desc.current.value,
  //     img: "",
  //   };
  //   if (file) {
  //     const data = new FormData();
  //     const fileName = file.name;
  //     data.append("file", file);
  //     data.append("name", fileName);
  //     NewPost.img = fileName;
  //     console.log(NewPost);
  //     try {
  //       await axios.post(process.env.REACT_APP_API_URL + "/upload", data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   showLoader();

  //   try {
  //     await axios.post(process.env.REACT_APP_API_URL + "/posts", NewPost);
  //     window.location.reload();
  //     hideLoader();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const getProfilePic = () => {
    if (user.profilePicture === "") {
      return "/assets/person/noAvatar.png";
    } else {
      return user.profilePicture;
    }
  };

  return (
    <div className="share">
      {loaderState ? (
        loader
      ) : (
        <div className="shareWrapper">
          <div className="shareTop">
            <img src={getProfilePic()} alt="" className="shareProfileImg" />
            <input
              placeholder={"What's In your Mind  " + user.username + "?"}
              className="shareInput"
              ref={desc}
            />
          </div>
          <hr className="shareHr" />
          {previewSource && (
            <div className="shareImgContainer">
              <img src={previewSource} alt="" className="shareImg" />
              <Cancel
                className="shareCancel"
                onClick={() => setPreviewSource(null)}
              />
            </div>
          )}
          <form className="shareBottom" onSubmit={handleSubmitFile}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareOptionIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  id="file"
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  style={{ display: "none" }}
                />
              </label>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareOptionIcon" />
                <span className="shareOptionText p">Tag</span>
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
            {showShare ? (
              <button type="submit" className="shareButton">
                Share
              </button>
            ) : (
              <button type="submit" className="shareButton">
                Share
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
