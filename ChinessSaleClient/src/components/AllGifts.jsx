
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { GetAllGift, deleteGiftApi, GetCategoryById, updateGiftApi, GetDonorById, getGiftsByPurchaseCount } from '../api/api';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import AddGiftModal from './AddGiftModal';
import EditGiftModal from './EditGiftModal';
import {GetSaleByGift} from '../api/SaleApi'
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import NavigationBarManager from './NavigationBarManager';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog'; 

const AllGifts = () => {
    const [gifts, setGifts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [sortOrder, setSortOrder] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false); 
    const [giftToDelete, setGiftToDelete] = useState(null); 

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
             return { ...gift, category: category.name, donor: donorName };
        }));
    
        setGifts(giftsWithCategoryAndDonor);
        } catch (error) {
            console.error('Error fetching gifts:', error);
        }
    };


    // const deleteGift = async (giftId) => {
    //     await deleteGiftApi(giftId);
    //     setGifts(gifts.filter(gift => gift.id !== giftId));
    // };

        // פונקציה למחיקת מתנה
        const deleteGift = async () => {
            if (giftToDelete) {
                await deleteGiftApi(giftToDelete.id);
                setGifts(gifts.filter(gift => gift.id !== giftToDelete.id));
            }
            setDeleteDialogVisible(false); // סגירת הדיאלוג אחרי המחיקה
        };
    
        // הצגת דיאלוג אישור מחיקה
        const confirmDeleteGift = (gift) => {
            setGiftToDelete(gift);
            setDeleteDialogVisible(true);
        };

    const editGift = (gift) => {
        setSelectedGift(gift);
        setIsEditModalOpen(true);
    };

    const onEditGift = async (updatedGift) => {
        await updateGiftApi(updatedGift);
        const category = await GetCategoryById(updatedGift.categoryId);
        updatedGift.category = category.name;
        const donor=await GetDonorById(updatedGift.donorId);
        updatedGift.donor = donor.name;
        setGifts(gifts.map(gift => (gift.id === updatedGift.id ? updatedGift : gift)));
        setIsEditModalOpen(false);
    };

    const addNewGiftToState = async (newGift) => {
        const category = await GetCategoryById(newGift.categoryId);
        newGift.category = category.name;
        const donor=await GetDonorById(newGift.donorId);
        newGift.donor = donor.name;
        setGifts([...gifts, newGift]);
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

    const countSalesForGifts = async (gifts) => {
        const purchasesCount = await Promise.all(gifts.map(async (gift) => {
            const purchases = await GetSaleByGift(gift.id);
            return { ...gift, purchaseCount: purchases.length };
        }));
        return purchasesCount;
    };
    

    const sortOptions = [
        { label: 'שם מתנה', value: 'name' },
        { label: 'מחיר', value: 'price' }
    ];

    const searchOptions = [
        { label: 'שם מתנה', value: 'name' },
        { label: 'כמות רכישות', value: 'purchesCount' },
        { label: 'תורם', value: 'donor' }
    ];

    const onSortChange = (event) => {
        const value = event.value;
        let sortedGifts = [...gifts];

        if (value === 'name') {
            sortedGifts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === 'price') {
            sortedGifts.sort((a, b) => a.price - b.price);
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
        if (searchType === 'donor') {
            return gift.donor.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });
    
    const handleSearch = async () => {
        if (searchType === 'purchesCount') {
            const giftsWithPurchasesCount = await countSalesForGifts(gifts);
            const filteredByPurchaseCount = giftsWithPurchasesCount.filter(gift => gift.purchaseCount.toString() === searchTerm);
            setGifts(filteredByPurchaseCount); // כאן אתה צריך לעדכן את הסטייט של gifts
        } else {
            getAllGifts();
        }
    };

    const listItem = (gift, index) => {
        return (
            <div className="col-12" key={gift.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                {/* <img className="w-9 shadow-2 border-round" src={`/pic/${gift.image}`} alt={gift.name} /> */}
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
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={gift.img} alt={gift.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{gift.name}</div>
                            {/* <Rating value={gift.rating} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{gift.category}</span>
                                    <span className="font-semibold"> {gift.donor}:תורם</span>
                                </span>
                                <Tag value={gift.inventoryStatus} severity={getSeverity(gift)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${gift.price}</span>
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteGift(gift)} />
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editGift(gift)}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (gift) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 p-2" key={gift.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{gift.category}</span>
                            <span className="font-semibold"> {gift.donor}:תורם</span>
                            {/* <img className="w-11 shadow-2 border-round" src={`/pic/${gift.image}`} alt={gift.name} /> */}
                        </div>
                        <Tag value={gift.inventoryStatus} severity={getSeverity(gift)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        {/* <img className="w-9 shadow-2 border-round" src={gift.img} alt={gift.name} /> */}
                        {/* <div className="text-2xl font-bold">{gift.name}</div> */}
                        {/* <img className="w-9 shadow-2 border-round" src={`/pic/${gift.image}`} alt={gift.name} /> */}
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
                        <div className="text-2xl font-bold text-900">{gift.name}</div>
                        {/* <Rating value={gift.rating} readOnly cancel={false}></Rating> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${gift.price}</span>
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteGift(gift)} />

                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editGift(gift)}></Button>
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
                    <Button label="חיפוש" onClick={handleSearch} className="ml-2" />
                </div>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                <Button label="הוספת מתנה" onClick={() => setIsAddModalOpen(true)} />
            </div>
        );
    };

    return (
        <div className="card">
            <div className="col-12">         
            <NavigationBarManager/>
                        {/* דיאלוג אישור מחיקה */}
                        <Dialog header="אישור מחיקה" visible={deleteDialogVisible} style={{ width: '450px' }} footer={
                <>
                    <Button label="ביטול" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" />
                    <Button label="כן" icon="pi pi-check" onClick={deleteGift} autoFocus />
                </>
            } onHide={() => setDeleteDialogVisible(false)}>
                <p>לאחר המחיקה לא תהיה אפשרות לשחזר את המתנה האם אתם בטוחים?</p>
            </Dialog>
            {/* <NavigationBarManager User={"manager"}/> */}
                    <div className="flex justify-content-between align-items-center mb-4">
                    </div>
                    <DataView value={filteredGifts} itemTemplate={(gift, index) => itemTemplate(gift, layout, index)} layout={layout} paginator rows={9} sortOrder={sortOrder} header={header()} />
                    <AddGiftModal visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addNewGiftToState} />
                    <EditGiftModal visible={isEditModalOpen} gift={selectedGift} onEdit={onEditGift} onClose={() => setIsEditModalOpen(false)} />
            </div>
        </div>
    );
};

export default AllGifts;
