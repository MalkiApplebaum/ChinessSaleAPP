
import React, { useState } from 'react';
import { registerCustomer } from '../api/Register';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

const inputVariants = {
    focus: { scale: 1.05 },
    blur: { scale: 1 },
};

const buttonVariants = {
    hover: { scale: 1.1 },
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            const customerDto = { email, password, name, phone, address };
            await registerCustomer(customerDto);
            // Redirect to login or another page after successful registration
            window.location.href = '/';
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <motion.div
            className="register-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: 0.5 }}
            style={styles.container}
        >
            <motion.h1 style={styles.title}>הרשמה</motion.h1>
            <motion.input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="שם מלא"
                variants={inputVariants}
                whileFocus="focus"
                onBlur={() => {}}
                style={styles.input}
            />
            <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="אימייל"
                variants={inputVariants}
                whileFocus="focus"
                onBlur={() => {}}
                style={styles.input}
            />
            <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="סיסמה"
                variants={inputVariants}
                whileFocus="focus"
                onBlur={() => {}}
                style={styles.input}
            />
            <motion.input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="טלפון"
                variants={inputVariants}
                whileFocus="focus"
                onBlur={() => {}}
                style={styles.input}
            />
            <motion.input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="כתובת"
                variants={inputVariants}
                whileFocus="focus"
                onBlur={() => {}}
                style={styles.input}
            />
            <motion.button
                onClick={handleRegister}
                variants={buttonVariants}
                whileHover="hover"
                style={styles.button}
            >
                הרשמה וכניסה למערכת
            </motion.button>
            {error && <p>{error}</p>}
        </motion.div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundImage: 'url(/pic/basket.jpg)',        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '450px',
        direction: 'rtl',
        textalign: 'right',
    },
    title: {
        marginBottom: '20px',
        fontSize: '2rem',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px',
    },
};

export default Register;
