import { Modal, Button } from "react-bootstrap";
import { format } from "timeago.js";

function MyModal({ isOpen, toggleModal, LikedUsers , Post }) {
  return (
    <div>
      <Modal show={isOpen} onHide={toggleModal} animation={false}>
        <Modal.Header>
          <Modal.Title>Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {LikedUsers.map((u) => (
            <h5>
              <b style={{ color: "#eb5542" }}>{u.username}</b> liked this post{" "}
              <b style={{ color: "red" }}>{format(Post.updatedAt)}</b>
              <hr />
            </h5>
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
export default MyModal;
