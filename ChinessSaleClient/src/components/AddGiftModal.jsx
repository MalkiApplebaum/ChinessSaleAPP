



import React from 'react';
import Modal from 'react-modal';
import { AddGiftPage } from './AddGiftPage';
import Button from '@mui/material/Button';

const AddGiftModal = ({ visible, onClose, onAdd }) => {
    return (
        <Modal
            isOpen={visible}
            onRequestClose={onClose}
            contentLabel="Add Gift Modal"
        >
            <Button variant="outlined" onClick={onClose}>❌</Button>
            <AddGiftPage onAddGift={onAdd} />
        </Modal>
    );
};

export default AddGiftModal;
