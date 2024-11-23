
import { GetSaleByCustomerId, GetGiftById, UpdateSaleStatus } from "../api/GiftCustomerApi";
import { deleteSaleById } from "../api/SaleApi";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import NavigationBarCostumer from './NavigationBarCostumer';
import { useNavigate } from 'react-router-dom';
import { DataScroller } from 'primereact/datascroller';
import { Tag } from 'primereact/tag';
import { Image } from 'primereact/image';
import { GetCategoryById } from "../api/api";


export default function Basket({ customerId }) {
    const [Sales, setSales] = useState([]);
    const [selectedSales, setSelectedSales] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [creditCardDetails, setCreditCardDetails] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });
    const navigate = useNavigate();

    const GetAllSaleByCustomerId = async () => {
        try {
            const customerSales = await GetSaleByCustomerId(customerId);
            const salesWithGifts = await Promise.all(customerSales.map(async (sale) => {
                const gift = await GetGiftById(sale.giftId);
                const category = await GetCategoryById(gift.categoryId);
                return { ...sale, gift, category };
            }));
            const truePurchasers = salesWithGifts.filter(purchaser => purchaser.status === false);
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

    const handleProceedWithSelected = () => {
        setDialogVisible(true);
    };

    const updateAllSales = async () => {
        const promises = selectedSales.map(sale => UpdateSaleStatus(sale.id));
        await Promise.all(promises);
    };

    const handlePayment = async () => {
        console.log('Payment details:', creditCardDetails);
        console.log('Selected sales:', selectedSales);

        updateAllSales();
        setDialogVisible(false);
        setSelectedSales([]);  // Clear selected sales
        alert('התשלום הצליח');
    };

    const handleDeleteSale = async (saleId) => {
        try {
            await deleteSaleById(saleId);
            setSales(Sales.filter(sale => sale.id !== saleId));
        } catch (error) {
            console.error(`Error deleting sale ID ${saleId}:`, error);
            alert(`Error deleting sale ID ${saleId}: ${error.message}`);
        }
    };

    const itemTemplate = (sale) => {
        return (
            <div className="col-12" key={sale.id}> 
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <Checkbox checked={selectedSales.some(selected => selected.id === sale.id)}
                              onChange={(e) => handleCheckboxChange(e, sale)} />
                    <Image src={`/pic/${sale.gift?.image || 'Unknown Gift'}`} zoomSrc={`/pic/${sale.gift?.image || 'Unknown Gift'}`} alt={sale.gift.name} width="390" height="250" preview />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">                           
                            <div className="flex flex-column gap-1 align-items-center">
                                <div className="text-2xl font-bold text-900">{sale.gift?.name || 'Unknown Gift'}</div>
                                <div className="text-700"> {sale.category?.name || 'Unknown Category'}:קטגוריה</div>
                                <span className="text-700">{sale.count}:כמות</span>
                                <Button icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteSale(sale.id)} style={{ alignSelf: 'center', marginTop: 'auto' }} />
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const styles = {
        summary: {
          position: 'fixed',
          right: 0,
          top: '55%',
          transform: 'translateY(-50%)',
          width: '50vw', // או אחוזים כמו '80%' למשל
          maxWidth: '400px', // מקסימום רוחב אם צריך
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto', // הוספת גלילה אנכית במידת הצורך
          maxHeight: '80vh', // גובה מקסימלי כדי למנוע גלילה גדולה מדי
          display: 'flex',
          flexDirection: 'column',
        },
        list: {
          flex: '1',
          overflowY: 'auto',
        },
        buttonContainer: {
          textAlign: 'center',
          paddingTop: '10px',
          borderTop: '1px solid #ccc',
        },
    };
    
    return (
        <div className="card">
            <NavigationBarCostumer />
            <h3 style={{ color: '#0000FF' }}>בחרו מתנות שברצונכם לרכוש</h3>
            <DataScroller value={Sales} itemTemplate={itemTemplate} rows={5} buffer={0.4}/>
             {selectedSales.length > 0 && (
                <div style={styles.summary}>
                  <h3>מתנות שנבחרו</h3>
                  <ul style={styles.list}>
                      {selectedSales.map(sale => (
                      <li key={sale.id}>
                        {sale.gift ? sale.gift.name : 'Unknown Gift'}
                        <br />
                        <img src={`/pic/${sale.gift?.image || 'Unknown Gift'}`} alt={sale.gift.name} width="250" height="170" />
                      </li>
                      ))}
                  </ul>
                  <div style={styles.buttonContainer}>
                    <Button label="המשך" onClick={handleProceedWithSelected} />
                  </div>
                </div>
            )}
            <Dialog header="נא להכניס פרטי כרטיס אשראי" visible={dialogVisible} onHide={() => setDialogVisible(false)}>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="cardNumber">מספר כרטיס</label>
                        <InputText id="cardNumber" value={creditCardDetails.cardNumber} onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })} />
                    </div>
                    <div className="field">
                        <label htmlFor="expirationDate">תוקף</label>
                        <InputText id="expirationDate" value={creditCardDetails.expirationDate} onChange={(e) => setCreditCardDetails({ ...creditCardDetails, expirationDate: e.target.value })} />
                    </div>
                    <div className="field">
                        <label htmlFor="cvv">CVV</label>
                        <InputText id="cvv" value={creditCardDetails.cvv} onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })} />
                    </div>
                </div>
                <Button label="לשלם עכשיו" onClick={handlePayment} />
            </Dialog>
        </div>
    );
}
