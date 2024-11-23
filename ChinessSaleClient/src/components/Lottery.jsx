import React, { useEffect, useState } from 'react';
import { getAllSales, GetCustomerById } from '../api/GiftCustomerApi';  
import { GetAllGift, GetCategoryById, GetDonorById } from '../api/api';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import GiftsCostumer from './GiftsCustomer';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import NavigationBarManager from './NavigationBarManager';
import { Image } from 'primereact/image';

const Lottery = () => {
    const navigate = useNavigate();
    const [gifts, setGifts] = useState([]);
    const [winners, setWinners] = useState([]);
    const [selectedGiftIds, setSelectedGiftIds] = useState(new Set());

    const fetchGifts = async () => {
        try {
            const response = await GetAllGift('/api/Present');
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

    useEffect(() => {
        fetchGifts();
    }, []);

    const drawWinnerForGift = async (giftId) => {
        try {
            const purchasers = await getAllSales(giftId);
            const truePurchasers = purchasers.filter(purchaser => purchaser.status === true);
            const ticketPool = [];

            if (truePurchasers.length > 0) {
                truePurchasers.forEach(purchaser => {
                    for (let i = 0; i < purchaser.count; i++) {
                        ticketPool.push(purchaser.customerId);
                    }
                });

                const randomCustomerId = ticketPool[Math.floor(Math.random() * ticketPool.length)];
                const winner = await GetCustomerById(randomCustomerId);
                return { giftId, winner };
            } else {
                alert("There are no purchasers for this gift yet");
                return null;
            }
        } catch (error) {
            console.error(`Error drawing winner for gift ID ${giftId}:`, error);
            return null;
        }
    };

    const handleDraw = async (giftId) => {
        if (!selectedGiftIds.has(giftId)) {
            const winner = await drawWinnerForGift(giftId);
            if (winner) {
                setWinners([...winners, winner]);
                setSelectedGiftIds(new Set([...selectedGiftIds, giftId]));
            }
        }
    };

    const createWinnersReport = () => {
        const csvContent = winners.map(({ giftId, winner }) => `${winner.name},${winner.email},${getGiftNameById(giftId)}`).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'winners_report.csv';
        link.click();
    };

    const createRevenueReport = async () => {
        const salesData = await Promise.all(gifts.map(async (gift) => {
            const purchasers = await getAllSales(gift.id);
            const totalTickets = purchasers.reduce((sum, purchaser) => sum + purchaser.count, 0);
            const totalRevenue = totalTickets * gift.price;
            return {
                giftName: gift.name,
                totalTickets,
                totalRevenue
            };
        }));

        const totalRevenueSum = salesData.reduce((sum, { totalRevenue }) => sum + totalRevenue, 0);

        const csvContent = [
            ['Gift Name', 'Total Tickets', 'Total Revenue'],
            ...salesData.map(({ giftName, totalTickets, totalRevenue }) => [giftName, totalTickets, totalRevenue]),
            ['Total', '', totalRevenueSum]
        ].map(e => e.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'revenue_report.csv';
        link.click();
    };

    const getGiftNameById = (giftId) => {
        const gift = gifts.find(g => g.id === giftId);
        return gift ? gift.name : 'Unknown Gift';
    };

  
    const gridItem = (gift) => {
        const isWinnerSelected = selectedGiftIds.has(gift.id);
        return (
            <div className="col-12 sm:col-6 lg:col-4 p-2" key={gift.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{gift.category}</span>
                            <span className="font-semibold"> Donor: {gift.donor}</span>
                            </div>
                                      </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{gift.name}</div>
                        <Rating value={gift.rating} readOnly cancel={false}></Rating>
                    </div>
                    {/* <img className="w-11 shadow-2 border-round" src={`/pic/${gift.image}`} alt={gift.name} /> */}
                    <div className="w-full shadow-2 border-round"> {/* השתמשנו ב- w-full כך שהתמונה תתפוס את כל רוחב הקונטיינר */}
                    <Image 
                        src={`/pic/${gift.image}`} 
                        zoomSrc={`/pic/${gift.image}`} 
                        alt={gift.name} 
                        width="100%" 
                        height="auto"
                        maxWidth= '390px' // הגדרת גבול רוחב מקסימלי
                        maxHeight= '250px' 
                        preview 
                    />
                </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${gift.price}</span>
                        <style>
                {`
                .winner-card {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 1rem 0;
                    padding: 1.5rem;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #ffcccc, #ff6666);                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    animation: fadeIn 0.5s ease-in-out;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .winner-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
                }

                .winner-card-content {
                    text-align: center;
                }

                .winner-icon {
                    margin-bottom: 1rem;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
                            {isWinnerSelected ? (
                        <div className="winner-card">
                            <div className="winner-card-content">
                                <div className="winner-icon">
                                </div>
                                <div className="winner-info">
                                    <h3 className="winner-name">🎉 הזוכה: {winners.find(w => w.giftId === gift.id)?.winner.name}</h3>
                                    <p className="winner-email">✉️ אימייל זוכה: {winners.find(w => w.giftId === gift.id)?.winner.email}</p>
                                </div>
                            </div>
                        </div>
                        ) : (
                            <Button className="p-button-rounded p-button-danger" onClick={() => handleDraw(gift.id)}>הגרלת המתנה</Button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (gift) => {
        if (!gift) {
            return null;
        }
        return gridItem(gift);
    };

    
    return (
        <div>   
            <NavigationBarManager />
            <h1 style={{ color: 'blue' }}> הגרלת זוכים במתנות </h1> 
            {winners.length > 0 && (
                <Button className="p-button-rounded p-button-secondary" onClick={createWinnersReport}>הורדת קובץ הזוכים במכירה הסינית</Button>
            )}   
            <Button className="p-button-rounded p-button-info" onClick={createRevenueReport}>הורדת דו"ח סיכום הכנסות מהמכירה</Button>    
            <DataView value={gifts} itemTemplate={itemTemplate} layout="grid" />           
             </div>
    );
};

export default Lottery;












      