import axios from "axios";

axios.defaults.baseURL = "https://localhost:7235";

export async function getAllDonors(url) {
    return await axios.get(url)
        .then(function (response) {
            console.log('response', response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function GetAllGift(url) {
    return await axios.get(url)
        .then(function (response) {
            console.log('response', response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const GetCategoryById=async (Id) => {
    try{
        const response = await axios.get(`/api/Category/${Id}`);
        console.log(response.data); 
        return response.data; 
    }
    catch (error) {
        console.error('Error deleting gift:', error);
        throw error;
}
};

export const GetDonorById=async (Id) => {
    try{
        const response = await axios.get(`/api/Donor/${Id}`);
        console.log(response.data); 
        return response.data;
    }
    catch (error) {
        console.error('Error deleting gift:', error);
        throw error;
}
};


export async function AddGift(donorId, price, name, description, categoryId, image) {
    console.log(donorId, price, name, description, categoryId, image);
    try {
        const response = await axios.post("/api/Present", {
            donorId,
            price,
            name,
            description,
            categoryId,
            image: image ? btoa(image) : null
        });
        console.log('Gift added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding gift:', error);
        throw error;
    }
}



export const deleteGiftApi = async (giftId) => {
    try {
        const response = await axios.delete(`/api/Present/${giftId}`);
        console.log(response.data); 
        return response.data; 
    } catch (error) {
        console.error('Error deleting gift:', error);
        throw error;
    }
};


export const updateGiftApi = async (gift) => {
    try {
        const response = await axios.put(`/api/Present/${gift.id}`, gift);
        return response.data;
    } catch (error) {
        console.error('Error updating gift:', error);
        throw error;
    }
};

export const getAllSales=async(giftId)=>{
    try{
        const response = await axios.get(`/api/Sale`);
        console.log(response.data); 
        return response.data; 
    }
    catch (error) {
        console.error('Error deleting gift:', error);
        throw error;
    }
}


export async function GetAllSales(url) {
return await axios.get(url)
.then(function (response) {
    console.log('response', response);
    return response.data;
})
.catch(function (error) {
    console.log(error);
});
}


export async function getGiftsByPurchaseCount(purchaseCount) {
    try {
        const allSales = await getAllSales(`/api/Sale`);
        const purchaseCounts = allSales.reduce((acc, sale) => {
            acc[sale.GiftId] = (acc[sale.GiftId] || 0) + 1;
            return acc;
        }, {});

        const matchingGiftIds = Object.keys(purchaseCounts)
            .filter(GiftId => purchaseCounts[GiftId] == purchaseCount)
            .map(Number);

        const allGifts = await GetAllGift('/api/Present');

        const matchingGifts = allGifts.filter(gift => matchingGiftIds.includes(gift.Id));

        return matchingGifts;
    } catch (error) {
        console.error('Error fetching gifts by purchase count:', error);
        throw error;
    }
}