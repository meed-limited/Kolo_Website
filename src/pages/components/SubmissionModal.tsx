import React from "react";

import Modal from "react-bootstrap/Modal";

interface SubmissionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({ isModalOpen, setIsModalOpen }: SubmissionModalProps) => {
  return (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered className="submission-modal">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>submission</Modal.Body>
    </Modal>
  );
};

export default SubmissionModal;
