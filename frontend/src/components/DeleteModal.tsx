import React from 'react';
import { Modal } from 'antd';

interface DeleteModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Delete Confirmation"
      open={isVisible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p>Are you sure you want to delete this item?</p>
    </Modal>
  );
};

export default DeleteModal;
