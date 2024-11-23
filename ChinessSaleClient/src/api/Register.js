import axios from 'axios';

axios.defaults.baseURL = "https://localhost:7235";

export async function registerCustomer(customerDto) {
    try {
        const response = await axios.post('/api/Customer', customerDto);
        console.log('Customer registered successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering customer:', error);
        throw error;
    }
}
