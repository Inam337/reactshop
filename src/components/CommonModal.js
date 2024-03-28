// CommonModal.js
import Modal from "react-bootstrap/Modal";

const CommonModal = ({ isOpen, title, description, onConfirm, onClose }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="row mt-2 mb-2">
            <div className="col-6">
              <button
                className="btn btn-primary w-100"
                variant="secondary"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-secondary w-100"
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommonModal;
