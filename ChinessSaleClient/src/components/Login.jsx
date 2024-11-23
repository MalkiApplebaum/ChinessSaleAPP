import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, logout } from '../api/Login';
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

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [donors, setDonors] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { token, isExistingUser, isManager, user } = await loginUser(email, password);

            if (token) {
                setIsLoggedIn(true);

                if (isExistingUser) {
                    onLoginSuccess(user); // Pass the user to the function
                    //alert(user.isManager);
                    navigate(isManager ? '/Home' : '/CustomerHome');
                }
            } else {
                navigate('/register');
            }
        } catch (error) {
            console.error('Login or fetching donors failed:', error);
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setDonors([]);
    };

    return (
        <motion.div
            className="login-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: 0.5 }}
            style={styles.container}
        >
            <motion.h1
                style={styles.title}
            >
                התחברות
            </motion.h1>
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
            <motion.button
                onClick={handleLogin}
                variants={buttonVariants}
                whileHover="hover"
                style={styles.button}
            >
                כניסה למערכת
            </motion.button>
            {isLoggedIn && (
                <motion.button
                    onClick={handleLogout}
                    variants={buttonVariants}
                    whileHover="hover"
                    style={styles.button}
                >
                    Logout
                </motion.button>
            )}
            <motion.h2
                style={styles.subtitle}
            >
            </motion.h2>
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
        backgroundImage: 'url(/pic/basket.jpg)',        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '450px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        direction: 'rtl',
        textalign: 'right',
    },
    title: {
        marginBottom: '20px',
        /////
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
    subtitle: {
        marginTop: '20px',
        marginBottom: '10px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        width: '100%',
    },
    listItem: {
        padding: '8px 0',
        borderBottom: '1px solid #ddd',
    },
};

export default Login;
