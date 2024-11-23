import axios from "axios";

axios.defaults.baseURL = "https://localhost:7235";

export const GetSaleByGift = async(giftId) => {
    try{
        const response= await axios.get(`/api/Sale/GetSaleByGift/${giftId}`);
        return response.data;
    } catch (error){
        console.error('Error getting gift Sales',error)
        throw error;
    }  
}

export async function GetSaleById(id){
    try{
        const response= await axios.get(`/api/Sale/${id}`);
        return response.data;
    } catch (error){
        console.error('Error getting Sale',error)
        throw error;
    }    
}

export const deleteSaleById = async (saleId) => {
    try {
        const response = await axios.delete(`/api/Sale/${saleId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting sale ID ${saleId}:`, error);
        throw error;
    }
};
