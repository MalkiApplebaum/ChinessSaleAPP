import axios from "axios";

axios.defaults.baseURL = "https://localhost:7235";



export async function AddDonor(password, name, phone,email ) {
    console.log(password, name, phone,email);
    try {
        const response = await axios.post("/api/Donor", {
            password,
            name, 
            phone,
            email
        });
        console.log('Donor added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding Donor:', error);
        throw error;
    }
}



export const deleteDonor = async (donorId) => {
    try {
        const response = await axios.delete(`/api/Donor/${donorId}`);
        console.log(response.data); // אם ברצונך להדפיס את התשובה מהשרת
        return response.data; // אם ברצונך להחזיר את התשובה מהשרת
    } catch (error) {
        console.error('Error deleting donor:', error);
        throw error;
    }
};

export const updateDonor = async (donor) => {
    try {
        const response = await axios.put(`/api/Donor/${donor.id}`, donor);
        return response.data;
    } catch (error) {
        console.error('Error updating donor:', error);
        throw error;
    }
};

export const GetPresentByDonorId=async(donorId)=>{
    try{
        const response= await axios.get(`/api/Present/GetPresentByDonorId${donorId}`);
        return response.data;
    } catch (error){
        console.error('Error getting Donor gifts',error)
        throw error;
    }
}