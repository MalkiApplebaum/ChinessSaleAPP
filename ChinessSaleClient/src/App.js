import React, {useState,useEffect  } from 'react';
import './App.css';
import AllDonors from './components/AllDonors';
import AllGifts from './components/AllGifts';
import AddGiftPage from './components/AddGiftPage';
import { Routes, Route } from 'react-router-dom'; // Import Routes instead of Switch
import GiftsCustomer from './components/GiftsCustomer';
import Lottery from './components/Lottery';
import Home from './components/ManagerHome';
import Login from './components/Login';
import CostumerBasket from './components/CostumerBasket';
import SalesList from './components/SaleComponent';
import Basket from './components/CostumerBasket';
import PurchasersCostumer from './components/CostumerPurchers';
import Register from './components/Register';
import CustomerHome from './components/CustomerHome';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    // שמירת המזהה ב-localStorage כדי לשמור אותו ברענון דף
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);
    const handleLoginSuccess = (user) => {
        setUserId(user.id);
    };

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<Login onLoginSuccess={handleLoginSuccess}/>} />
        <Route path='/CustomerHome' element={<CustomerHome/>} />
        <Route path='/Home' element={<Home />} />
        <Route path='/allGifts' element={<AllGifts />} />
        {/* <Route path='/customerBasket' element={<CostumerBasket customerId={userId}/>} /> */}
        <Route path='/lottery' element={<Lottery />} />
        <Route path='/sales' element={<SalesList />} />
        <Route path='/donors' element={<AllDonors />} />
        <Route path='/giftsCustomer' element={<GiftsCustomer />} />
        <Route path='/basketCustomer' element={<Basket customerId={userId} />} />
        <Route path='/purchasersCustomer' element={<PurchasersCostumer customerId={userId} />} />
      </Routes>
    </div>
  );
}
export default App;
