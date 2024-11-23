
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';

function LogOutButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    // הסר את הטוקן מהלוקל סטורג'
    localStorage.removeItem('token');
    // נווט לדף הלוגין
    navigate('/');
  };

  // הראה את הכפתור רק אם הכתובת הנוכחית איננה '/no-log-out'
  if (location.pathname === '/'|| location.pathname === '/register') {
    return null;
  }

return (
  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
    <Button icon="pi pi-sign-out" onClick={() => handleLogOut()} rounded severity="success" aria-label="sign-out" />
  </div>
);

}

export default LogOutButton;
