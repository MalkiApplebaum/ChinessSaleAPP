import axios from "axios";

axios.defaults.baseURL = "https://localhost:7235";

export async function loginUser(email, password) {
    try {
        const response = await axios.post('/api/Login', { email, password });
        const token = response.data.token;
        const user=response.data.user;
        const isManager=user.isManager;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id); // שמירת ה-ID של המשתמש

        setAuthToken(token);
        console.log('Login successful, token stored in local storage:', token);

        return { token, isExistingUser: true, isManager , user}; // משתמש קיים ומחזיר את isManager
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('User does not exist:', error);
            return { token: null, isExistingUser: false }; // משתמש לא קיים
        } else {
            console.error('Error during login:', error);
            throw error;
        }
    }
}

export function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

export function logout() {
    localStorage.removeItem('token');
    setAuthToken(null);
    console.log('Logout successful, token removed from local storage');
}
