import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationBarManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const items = [
        { label: 'דף הבית', icon: 'pi pi-home', path: '/Home' },
        { label: 'ניהול מתנות', icon: 'pi pi-gift', path: '/AllGifts' },
        { label: 'ניהול תורמים', icon: 'pi pi-user', path: '/Donors' },
        { label: 'ניהול רכישות', icon: 'pi pi-shopping-cart', path: '/Sales' },
        { label: 'הגרלת הזוכים', icon: 'pi pi-trophy', path: '/Lottery' }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const active = items.findIndex(item => location.pathname.startsWith(item.path));
        setActiveIndex(active);
    }, [location, items]); 


    const handleMenuItemClick = (event) => {
        const itemPath = event.value.path;
        navigate(itemPath);
    };

    return (
        <>
        <style>
                {`
                    /* סגנון לפס הכחול מתחת לטאב הפעיל */
                    .p-tabmenu .p-tabmenu-nav li.p-highlight {
                        background-color: #1e90ff !important; /* כחול */
                        color: white !important; /* שינוי צבע הטקסט ללבן */
                    }

                    .p-tabmenu .p-tabmenu-nav li.p-highlight:hover {
                        background-color: #1c86ee !important; /* כחול כהה בהובר */
                    }
                `}
            </style>
        <TabMenu 
            model={items} 
            onTabChange={handleMenuItemClick} 
            activeIndex={activeIndex} 
        />
        </>
    );
};
export default NavigationBarManager;



    
    

       
      




       
   



           
            
          
       
    



