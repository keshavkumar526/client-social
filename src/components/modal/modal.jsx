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

// import React from "react";
// import "./modal.css";
// import { Modal} from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function ModalTop(props) {
//   const handleClose = () => props.setIsShow(false);
//   return (
//     <div>
//       <Modal className="modal" show={props.isShow} onHide={handleClose}>
//         <Modal.Header>
//           <Modal.Title></Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="modal-body">
//           <Link
//             to={"/profile/" + props.username}
//             style={{ textDecoration: "none" }}
//           >
//             <img
//               src={
//                 props.profilePicture ||
//                 process.env.REACT_APP_IMAGES_URL + "/images/person/noAvatar.png"
//               }
//               alt=""
//               className="postProfileImg"
//             />
//             <span className="postUsername">{props.username}</span>
//           </Link>
//         </Modal.Body>
//         <Modal.Footer></Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
