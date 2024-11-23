import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationBarCustomer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(null);

    const items = [
        { label: "דף הבית", icon: "pi pi-home", path: `/CustomerHome` },
        { label: "מתנות", icon: "pi pi-gift", path: `/giftsCustomer` },
        { label: "העגלה שלי", icon: "pi pi-shopping-cart", path: `/basketCustomer` },
        { label: "הרכישות שלי", icon: "pi pi-credit-card", path: `/purchasersCustomer` },
    ];

    const handleMenuItemClick = (event) => {
        navigate(event.value.path);
    };

    useEffect(() => {
      const active = items.findIndex(item => location.pathname.startsWith(item.path));
      setActiveIndex(active);
  }, [location, items]); 




    const activeItem = items.find((item) => item.path === location.pathname);

    return (
        <>
            <TabMenu 
                model={items} 
                onTabChange={handleMenuItemClick} 
                activeIndex={activeIndex} 
                className="custom-tabmenu"
            />
            
            <style>
                {`
                  .custom-tabmenu {
                    width: 100%; /* תופס את כל הרוחב */
                    justify-content: space-between;
                  }

                  @media screen and (max-width: 768px) {
                    .custom-tabmenu {
                      font-size: 14px; /* כיווץ גודל הפונט על מסכים קטנים */
                    }
                  }
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
        </>
    );
};

export default NavigationBarCustomer;





       
   



           
            
          
       
    



