import React from 'react';
import Modal from 'react-modal';
import { AddDonorPage } from './AddDonorPage';
import Button from '@mui/material/Button';

const AddDonorModal = ({ visible, onClose, onAdd }) => {
    return (
        <Modal
            isOpen={visible}
            onRequestClose={onClose}
            contentLabel="Add Donor Modal"
        >
            <Button variant="outlined" onClick={onClose}>❌</Button>
            <AddDonorPage onAddDonor={onAdd} />
        </Modal>
    );
};

export default AddDonorModal;

