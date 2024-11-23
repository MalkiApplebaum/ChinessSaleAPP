import { GetSaleByCustomerId, GetGiftById, UpdateSaleStatus } from "../api/GiftCustomerApi";
import { deleteSaleById } from "../api/SaleApi";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Image } from 'primereact/image';
import { classNames } from 'primereact/utils';
import NavigationBarCostumer from './NavigationBarCostumer';
import { useNavigate } from 'react-router-dom';
import { GetCategoryById } from "../api/api";

export default function PurchasersCostumer({ customerId }) {  // קבלת customerId כ- prop

    const [Sales, setSales] = useState([]);
    const [selectedSales, setSelectedSales] = useState([]);
    const [layout, setLayout] = useState('grid'); // Added layout state

    const navigate = useNavigate();

    const GetAllSaleByCustomerId = async () => {
        try {
            const customerSales = await GetSaleByCustomerId(customerId); 
            const salesWithGifts = await Promise.all(customerSales.map(async (sale) => {
                const gift = await GetGiftById(sale.giftId);
                const category = await GetCategoryById(gift.categoryId);
                return { ...sale, gift, category };
            }));
            const truePurchasers = salesWithGifts.filter(purchaser => purchaser.status === true);
            setSales(truePurchasers);
        } catch (error) {
            console.error('Error fetching Sales:', error);
        }
    }

    useEffect(() => {
        if (customerId) { 
            GetAllSaleByCustomerId();
        }
    }, [customerId]);

    const handleCheckboxChange = (event, sale) => {
        const { checked } = event.target;
        if (checked) {
            setSelectedSales([...selectedSales, sale]);
        } else {
            setSelectedSales(selectedSales.filter(selected => selected.id !== sale.id));
        }
    };

    const updateAllSales = async () => {
        const promises = selectedSales.map(sale => UpdateSaleStatus(sale.id));
        await Promise.all(promises);
    };

    const listItem = (sale, index) => {
        return (
            <div className="col-12" key={sale.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <Image src={`/pic/${sale.gift?.image || 'Unknown Gift'}`} zoomSrc={`/pic/${sale.gift?.image || 'Unknown Gift'}`} alt={sale.gift.name} width="390" height="250" preview />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{sale.gift?.name || 'Unknown Gift'}</div>
                            <div className="text-700">{sale.category?.name || 'Unknown Category'}קטגוריה</div>
                            <span className="text-700">{sale.count}:כמות</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const gridItem = (sale) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 p-2" key={sale.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <Image src={`/pic/${sale.gift?.image || 'Unknown Gift'}`} alt={sale.gift.name} width="100%" height="200" preview />
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{sale.gift?.name || 'Unknown Gift'}</div>
                        <div className="text-700">{sale.category?.name || 'Unknown Category'}:קטגוריה</div>
                        <span className="text-700">{sale.count}:כמות</span>
                    </div>
                </div>
            </div>
        );
    };
    const itemTemplate = (sale, layout, index) => {
        if (!sale) {
            return;
        }

        if (layout === 'list') return listItem(sale, index);
        else if (layout === 'grid') return gridItem(sale);
    };
    const listTemplate = (sales, layout) => {
        return <div className="grid grid-nogutter">{sales.map((sale, index) => itemTemplate(sale, layout, index))}</div>;
    };
    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };
    return (
        <div className="card">
            <NavigationBarCostumer />
            <DataView value={Sales} itemTemplate={itemTemplate} layout={layout} header={header()} />
            {selectedSales.length > 0 && (
                <div className="selected-sales-summary">
                    <h3>Selected Sales:</h3>
                    <ul>
                        {selectedSales.map(sale => (
                            <li key={sale.id}>{sale.gift ? sale.gift.name : 'Unknown Gift'}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
