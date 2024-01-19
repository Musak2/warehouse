import axios from 'axios';

const BASE_URL = 'https://dev.aux.boxpi.com/case-study';
const API_KEY = 'MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z';

export async function fetchWarehouseData(productId: string) {
    try {
        const response = await axios.get(`${BASE_URL}/products/${productId}/positions`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching warehouse data:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}
