import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const EditGiftModal = ({ visible, gift, onClose, onEdit }) => {
    const [editedGift, setEditedGift] = useState(null);

    useEffect(() => {
        setEditedGift(gift);
    }, [gift]);

    const handleEdit = () => {
        onEdit(editedGift);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedGift(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Dialog header="🎁עריכת מתנה" visible={visible} onHide={onClose} style={{ width: '30vw' }} footer={
            <div>
                <Button label="ביטול" icon="pi pi-times" onClick={onClose} className="p-button-text" />
                <Button label="שמירה" icon="pi pi-check" onClick={handleEdit} autoFocus />
            </div>
        }>
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <label htmlFor="name">שם</label>
                    <InputText id="name" name="name" value={editedGift?.name} onChange={handleChange} />
                </div>
                <div className="p-col-12">
                    <label htmlFor="category">קטגוריה</label>
                    <InputText id="category" name="category" value={editedGift?.categoryId} onChange={handleChange} />                 
                    {/* מראה את השם של הקטגוריה
                    <InputText id="category" name="category" value={editedGift.category} onChange={handleChange} /> */}
                </div>
                <div className="p-col-12">
                    <label htmlFor="price">מחיר</label>
                    <InputText id="price" name="price" value={editedGift?.price} onChange={handleChange} />
                </div>
                <div className="p-col-12">
                    <label htmlFor="description">תיאור המתנה</label>
                    <InputText id="description" name="description" value={editedGift?.description} onChange={handleChange} />
                </div>
                <div className="p-col-12">
                    <label htmlFor="donorId">ID תורם</label>
                    <InputText id="donorId" name="donorId" value={editedGift?.donorId} onChange={handleChange} />
                </div>
                <div className="p-col-12">
                    <label htmlFor="image">תמונה</label>
                    <InputText id="image" name="image" value={editedGift?.image} onChange={handleChange} />
                </div>
            </div>
        </Dialog>
    );
};

export default EditGiftModal;
