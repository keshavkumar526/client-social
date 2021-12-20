import { Modal, Button } from "react-bootstrap";

function MyModal({ isOpen, toggleModal, LikedUsers }) {
  return (
    <div>
      <Modal show={isOpen} onHide={toggleModal} animation={false}>
        <Modal.Header>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {LikedUsers.map((u) => (
            <li>
              <p>{u.username} liked this post</p>
            </li>
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
