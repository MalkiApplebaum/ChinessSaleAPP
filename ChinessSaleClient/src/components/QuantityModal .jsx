import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const QuantityModal = ({ visible, onHide, onAddToBasket }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToBasket = () => {
        onAddToBasket(quantity);
        onHide();
    };

    return (
        <Dialog header="בחר כמות" visible={visible} style={{ width: '350px' }} onHide={onHide}>
            <div className="flex justify-content-center align-items-center">
                <Button icon="pi pi-minus" onClick={decreaseQuantity} className="p-button-rounded p-button-text" />
                <span className="mx-3">{quantity}</span>
                <Button icon="pi pi-plus" onClick={increaseQuantity} className="p-button-rounded p-button-text" />
            </div>
            <div className="flex justify-content-center align-items-center mt-4">
                <Button label="הוסף לעגלה" onClick={handleAddToBasket} />
            </div>
        </Dialog>
    );
};

export default QuantityModal;
