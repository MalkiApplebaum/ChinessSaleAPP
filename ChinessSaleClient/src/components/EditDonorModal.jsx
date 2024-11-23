
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const EditDonorModal = ({ visible, donor, onClose, onEdit }) => {
    const [editedDonor, seteditedDonor] = useState(null);

    useEffect(() => {
        seteditedDonor(donor);
    }, [donor]);

    const handleEdit = () => {
        onEdit(editedDonor);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        seteditedDonor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Dialog header="עריכת פרטי תורם" visible={visible} onHide={onClose} style={{ width: '30vw' }} footer={
            <div>
                <Button label="ביטול" icon="pi pi-times" onClick={onClose} className="p-button-text" />
                <Button label="שמירה" icon="pi pi-check" onClick={handleEdit} autoFocus />
            </div>
        }>
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <label htmlFor="name">שם תורם</label>
                    <InputText id="name" name="name" value={editedDonor?.name || ''} onChange={handleChange} />
                </div>
                <div className="p-col-12">
                    <label htmlFor="password">סיסמה</label>
                    <InputText id="password" name="password" value={editedDonor?.password || ''} onChange={handleChange} />
                </div>
                <div className="p-col-12">
                    <label htmlFor="phone">טלפון</label>
                    <InputText id="phone" name="phone" value={editedDonor?.phone || ''} onChange={handleChange} />
                </div>
                <div className="p-col-12">
                    <label htmlFor="email">אימייל</label>
                    <InputText id="email" name="email" value={editedDonor?.email || ''} onChange={handleChange} />
                </div>
            </div>
        </Dialog>
    );
};

export default EditDonorModal;
