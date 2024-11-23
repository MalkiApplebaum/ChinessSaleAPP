import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { GetAllGift, GetCategoryById } from '../api/api';
import { Dropdown } from 'primereact/dropdown';
import QuantityModal from './QuantityModal ';
import { AddGiftToBasketApi , deleteGiftByCostumer} from '../api/GiftCustomerApi';
import NavigationBarCostumer from './NavigationBarCostumer';
import { useNavigate } from 'react-router-dom';
import { Image } from 'primereact/image';

const GiftsCostumer = () => {
    const [gifts, setGifts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [sortOrder, setSortOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');
    const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    const [isBasketVisible, setIsBasketVisible] = useState(false);  // מצב חדש להראות את העגלה
    const navigate=useNavigate();

    useEffect(() => {
        getAllGifts();
    }, []);

    const getAllGifts = async () => {
        try {
            const response = await GetAllGift('/api/Present');
            const giftsWithCategory = await Promise.all(response.map(async (gift) => {
                const category = await GetCategoryById(gift.categoryId);
                return { ...gift, category: category.name };
            }));

            setGifts(giftsWithCategory);
        } catch (error) {
            console.error('Error fetching gifts:', error);
        }
    };

    const deleteGiftByCostmuer = async (giftId,status) => {
        if(status==false)  {
            await deleteGiftByCostumer(giftId);
            setGifts(gifts.filter(gift => gift.id !== giftId));
        }   

    };

    const getSeverity = (gift) => {
        switch (gift.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

    const sortOptions = [
        { label: 'שם מתנה', value: 'name' },
        { label: 'מחיר לכרטיס', value: 'price' },
        { label: 'קטגוריה', value: 'category' }
    ];

    const searchOptions = [
        { label: 'שם מתנה', value: 'name' },
    ];

    const onSortChange = (event) => {
        const value = event.value;
        let sortedGifts = [...gifts];

        if (value === 'name') {
            sortedGifts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === 'price') {
            sortedGifts.sort((a, b) => a.price - b.price);
        } else if (value === 'category') {
            sortedGifts.sort((a, b) => a.category.localeCompare(b.category));
        }
        setSortOrder(value);
        setGifts(sortedGifts);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.value);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredGifts = gifts.filter(gift => {
        if (searchType === 'name') {
            return gift.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    const handleSearch = async () => {
        getAllGifts();
    };

    const AddGiftToBasket = (gift, quantity) => {
        const customerId = localStorage.getItem('userId'); // או קבלת ה-ID ממקור אחר כמו context או token
        if (customerId) {
            setSelectedGift(gift);
            AddGiftToBasketApi(customerId, gift.id, quantity);
        } else {
            console.error("No customer ID found.");
        }
    };

    const handleAddGiftClick = (gift) => {
        setSelectedGift(gift);
        setIsQuantityModalOpen(true);
    };

    const handleAddToBasket = (quantity) => {
        AddGiftToBasket(selectedGift, quantity);
    };

    const listItem = (gift, index) => {
        return (
            <div className="col-12" key={gift.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{gift.name}</div>
                            <div className="w-full shadow-2 border-round"> {/* השתמשנו ב- w-full כך שהתמונה תתפוס את כל רוחב הקונטיינר */}
                            <Image 
                                src={`/pic/${gift.image}`} 
                                zoomSrc={`/pic/${gift.image}`} 
                                alt={gift.name} 
                                width="100%" 
                                height="auto"
                                maxWidth= '390px' // הגדרת גבול רוחב מקסימלי
                                maxHeight= '250px' // הגדרת גבול גובה מקסימלי
                                preview 
                            />
                        </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{gift.category}</span>
                                </span>
                                <Tag value={gift.inventoryStatus} severity={getSeverity(gift)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${gift.price}✅  מחיר לכרטיס </span>
                            <Button icon="pi pi-cart-plus" className="p-button-rounded p-button-success" onClick={() => handleAddGiftClick(gift)}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (gift) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2" key={gift.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{gift.category}</span>
                        </div>
                        <Tag value={gift.inventoryStatus} severity={getSeverity(gift)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                    <div className="w-full shadow-2 border-round"> {/* השתמשנו ב- w-full כך שהתמונה תתפוס את כל רוחב הקונטיינר */}
                    <Image 
                        src={`/pic/${gift.image}`} 
                        zoomSrc={`/pic/${gift.image}`} 
                        alt={gift.name} 
                        width="100%" 
                        height="auto"
                        maxWidth= '390px' 
                        maxHeight= '250px' 
                        preview 
                    />
                </div>
                        <div className="text-2xl font-bold">{gift.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${gift.price}  ✅  מחיר לכרטיס   </span>
                        <Button icon="pi pi-cart-plus" className="p-button-rounded p-button-success" onClick={() => handleAddGiftClick(gift)}></Button>
                    </div>
                </div>
            </div>
        );
    };
   
    const itemTemplate = (gift, layout, index) => {
        if (!gift) {
            return;
        }

        if (layout === 'list') return listItem(gift, index);
        else if (layout === 'grid') return gridItem(gift);
    };

    const header = () => {
        return (
            <div className="flex justify-content-between items-center">
                <div className="flex items-center">
                    <Dropdown value={sortOrder} options={sortOptions} onChange={onSortChange} placeholder="מיין לפי" className="mr-2" />
                    <Dropdown value={searchType} options={searchOptions} onChange={handleSearchTypeChange} placeholder="חפש לפי" className="mr-2" />
                    <input
                        type="text"
                        placeholder="...הכנס ערך לחיפוש"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        className="p-inputtext p-component"
                        style={{ marginLeft: '8px' }}
                    />
                    <Button label="Search" onClick={handleSearch} className="ml-2" />
                </div>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <div className="col-12">             
            <NavigationBarCostumer/>            
                    <div className="flex justify-content-between align-items-center mb-4">
                    </div>
                    <DataView value={filteredGifts} itemTemplate={(gift, index) => itemTemplate(gift, layout, index)} layout={layout} paginator rows={9} sortOrder={sortOrder} header={header()} />
            </div>          
            <QuantityModal
                visible={isQuantityModalOpen}
                onHide={() => setIsQuantityModalOpen(false)}
                onAddToBasket={handleAddToBasket}
            />
        </div>
    );
};

export default GiftsCostumer;
