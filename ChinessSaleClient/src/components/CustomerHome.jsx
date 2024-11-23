import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa'; // Import the gift icon
import NavigationBarCostumer from './NavigationBarCostumer';
import { Margin } from '@mui/icons-material';

function CustomerHome() {
  const navigate = useNavigate();

  const handleViewGiftsClick = () => {
    navigate('/giftsCustomer');
  };

  return (
    <div className="app-container" style={styles.appContainer}>
      <NavigationBarCostumer />
      <div className="welcome-section" style={styles.welcomeSection}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="welcome-text"
          style={styles.welcomeText}
        >
          ברוכים הבאים למכירה הסינית
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="view-gifts-button"
          style={styles.viewGiftsButton}
          onClick={handleViewGiftsClick}
        >
          <FaGift style={{ marginRight: '10px' }} /> לצפייה בכל המתנות
        </motion.button>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    height: '100vh',
    backgroundImage: 'url(/pic/basket.jpg)',  // Define the background image from the public folder
    backgroundSize: 'cover',  // Makes the image scale
    backgroundPosition: 'center',  // Keeps the image centered
    backgroundRepeat: 'no-repeat',  // Avoids repeating the image
  },
  welcomeSection: {
    padding: '50px',
    borderRadius: '15px',
    alignItems:'right',
    justifyContent: 'right',
    marginRight:'600px',

  },
  welcomeText: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  viewGiftsButton: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: '#3AC822',
    backgroundColor: '#000000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

styles.viewGiftsButton[':hover'] = {
  backgroundColor: '#F4F92B',
};

// Apply hover styles dynamically
styles.viewGiftsButton[':hover'] = styles.viewGiftsButtonHover;

export default CustomerHome;
