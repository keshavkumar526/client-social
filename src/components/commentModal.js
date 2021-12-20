import "./modalLike.css";
import Comment from "./comment";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function MyCommentModal({ post, toggleModal, isOpen }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const MyCommentModalHandler = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL +
            "/comments/" +
            post._id +
            "/getComment"
        );
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (isOpen) {
      MyCommentModalHandler();
    }
  }, [isOpen]);

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={toggleModal}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.map((comment, index) => (
            <Comment comment={comment} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default MyCommentModal;
