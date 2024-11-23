import axios from "axios";

axios.defaults.baseURL = "https://localhost:7235";



export async function AddGiftToBasketApi(CustomerId, GiftId,Count ) {
    console.log(CustomerId, GiftId,Count);
    let Status=false;
    try {
        const response = await axios.post("/api/Sale", {
            CustomerId,
             GiftId,
              Status,
              Count
        });
        console.log('gift added to basket successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding gift to basket:', error);
        throw error;
    }
}

export async function GetSaleByCustomerId(CustomerId){
    try{
        const response= await axios.get(`/api/Sale/GetSaleByCustomerIdAsinc${CustomerId}`);
        return response.data;
    } catch (error){
        console.error('Error getting Customer Sales',error)
        throw error;
    }    
}
export async function GetCustomerByCustomerId(CustomerId){
    try{
        const response= await axios.get(`/api/Customer/${CustomerId}`);
        return response.data;
    } catch (error){
        console.error('Error getting Customer Sales',error)
        throw error;
    }    
}

export async function GetCustomerIdByDigtId(giftId){
    try{
        const response= await axios.get(`/api/Sale/GetSaleByCustomerIdAsinc${giftId}`);
        return response.data;
    } catch (error){
        console.error('Error getting Customer Sales',error)
        throw error;
    }    
}

export async function GetGiftById(id){
    try{
        const response= await axios.get(`/api/Present/GetGiftById${id}`);
        return response.data;
    } catch (error){
        console.error('Error getting gift',error)
        throw error;
    }    
}

export const UpdateSaleStatus  = async (id) => {
    try {
        const response = await axios.put(`/api/Sale/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error updating gift:', error);
        throw error;
    }
};
export async function getAllSales(id){
    try{
        const response= await axios.get(`/api/Sale/GetSaleByGift/${id}`);
        return response.data;
    } catch (error){
        console.error('Error getting gift',error)
        throw error;
    }    
}

export async function GetCustomerById(id){
    try{
        const response= await axios.get(`/api/Customer/${id}`);
        return response.data;
    } catch (error){
        console.error('Error getting Customer',error)
        throw error;
    }    
}


export const deleteGiftByCostumer = async (giftId) => {
    try {
        const response = await axios.delete(`/api/Present/${giftId}`);
        console.log(response.data); 
        return response.data; 
    } catch (error) {
        console.error('Error deleting gift:', error);
        throw error;
    }
};