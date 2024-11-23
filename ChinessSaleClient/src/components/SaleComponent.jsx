import React, { useState, useEffect } from 'react';
import { GetSaleByGift } from '../api/SaleApi';
import { GetAllGift, GetCategoryById, GetDonorById } from '../api/api';
import { GetCustomerById } from '../api/GiftCustomerApi';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import NavigationBarManager from './NavigationBarManager';
import { Image } from 'primereact/image';

const SalesList = () => {
    const [sales, setsales] = useState([]);
    const [gifts, setGifts] = useState([]);
    const [isSalesDialogOpen, setIsSalesDialogOpen] = useState(false); // שינוי 1: שינינו את שם הדיאלוג עבור רכישות
    const [isPurchaserDialogOpen, setIsPurchaserDialogOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllGifts();
    }, []);

    const getAllGifts = async () => {
        try {
            const response = await GetAllGift('/api/Present');
            console.log('All Gifts Response:', response);
            const giftsWithCategoryAndDonor = await Promise.all(response.map(async (gift) => {
                const category = await GetCategoryById(gift.categoryId);
                let donorName = 'Unknown Donor';
                try {
                    const donor = await GetDonorById(gift.donorId);
                    donorName = donor.name;
                } catch (error) {
                    console.error(`Error fetching donor for gift ID ${gift.id}:`, error);
                }

                const purchases = await GetSaleByGift(gift.id);
                return { ...gift, category: category.name, donor: donorName, purchases: purchases.length };
            }));

            setGifts(giftsWithCategoryAndDonor);
        } catch (error) {
            console.error('Error fetching gifts:', error);
        }
    };

    const getAllSales = async (giftId) => {
        try {
            const response = await GetSaleByGift(giftId);
            setsales(response);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const getPurchasersDetails = async (customerIds) => {
        try {
            const customerDetails = await Promise.all(customerIds.map(id => GetCustomerById(id)));
            setCustomers(customerDetails);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const openSalesDialog = async (giftId) => { // שינוי 2: שם הפונקציה שונה לדיאלוג של רכישות
        await getAllSales(giftId);
        setIsSalesDialogOpen(true);
        const select = gifts.find(gift => gift.id === giftId);
        setSelectedGift(select);
    };

    const openPurchaserDialog = async (giftId) => { // שינוי 3: קישור הדיאלוג ללקוחות לפי מתנה נבחרת
        const customerIds = sales.map(sale => sale.customerId);
        await getPurchasersDetails(customerIds);
        setIsPurchaserDialogOpen(true);
    };

    const sortOptions = [
        { label: 'שם', value: 'name' },
        { label: 'מחיר', value: 'price' },
        { label: ' כמות רכישות', value: 'mostPurchased' },
        { label: 'הכי יקר', value: 'mostExpensive' }
    ];

    const onSortChange = (event) => {
        const value = event.value;
        let sortedGifts = [...gifts];

        if (value === 'name') {
            sortedGifts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === 'price') {
            sortedGifts.sort((a, b) => a.price - b.price);
        } else if (value === 'mostPurchased') {
            sortedGifts.sort((a, b) => b.purchases - a.purchases);
        } else if (value === 'mostExpensive') {
            sortedGifts.sort((a, b) => b.price - a.price);
        }

        setSortOrder(value);
        setGifts(sortedGifts);
    };

    const gridItem = (gift) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 p-2" key={gift.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="w-full shadow-2 border-round">
                            <Image
                                src={`/pic/${gift.image}`}
                                zoomSrc={`/pic/${gift.image}`}
                                alt={gift.name}
                                width="100%"
                                height="auto"
                                preview
                            />
                        </div>
                        <div className="text-2xl font-bold">{gift.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${gift.price}</span>
                        <Button
                            label="רכישות"
                            icon="pi pi-gift"
                            className="p-button-rounded p-button-teal-500"
                            onClick={() => openSalesDialog(gift.id)} // שינוי 4: כפתור לדיאלוג של רכישות
                        />
                        <Button
                            label="לקוחות"
                            icon="pi pi-users"
                            className="p-button-rounded p-button-primary"
                            onClick={() => openPurchaserDialog(gift.id)} // שינוי 5: כפתור לדיאלוג של פרטי לקוחות
                        />
                    </div>
                </div>
            </div>
        );
    };

    const header = () => {
        return (
            <div className="flex justify-content-between items-center">
                <div className="flex items-center">
                    <Dropdown value={sortOrder} options={sortOptions} onChange={onSortChange} placeholder="מיין לפי" className="mr-2" />
                </div>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div>
            <NavigationBarManager />
            <DataView
                value={gifts}
                itemTemplate={gridItem}
                layout={layout}
                paginator
                rows={9}
                header={header()}
            />
            <Dialog open={isSalesDialogOpen} onClose={() => setIsSalesDialogOpen(false)}> {/* שינוי 6: דיאלוג רכישות */}
                <DialogTitle>רכישות עבור {selectedGift && selectedGift.name}</DialogTitle>
                <DialogContent>
                    <ul>
                        {sales.map(sale => (
                            <li key={sale.id}>
                                <p>ID לקוח: {sale.customerId}</p>
                                <p>ID מתנה: {sale.giftId}</p>
                                <p>סטטוס רכישה: {sale.status}</p>
                                <p>כמות: {sale.count}</p>
                            </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>
            <Dialog open={isPurchaserDialogOpen} onClose={() => setIsPurchaserDialogOpen(false)}> {/* שינוי 7: דיאלוג לקוחות */}
                <DialogTitle>פרטי לקוחות</DialogTitle>
                <DialogContent>
                    <ul>
                        {customers.map(customer => (
                            <li key={customer.id}>
                                <p>שם לקוח: {customer.name}</p>
                                <p>אימייל לקוח: {customer.email}</p>
                                <p>טלפון לקוח: {customer.phone}</p>
                                <p>כתובת לקוח: {customer.address}</p>
                            </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalesList;
