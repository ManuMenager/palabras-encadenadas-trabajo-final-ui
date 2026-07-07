import apiClient from "./api";

export const validateWord = async (word) => {
    const response = await apiClient.get(`/validate?word=${word}`);
    return response.data.exists; 
};