import axios from 'axios';

// Base URL for the API endpoint
const BASE_URL = 'https://dev.aux.boxpi.com/case-study';

// API Key for authentication with the endpoint
const API_KEY = 'MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z';

/**
 * Fetches warehouse data for a given product.
 * 
 * @param {string} productId - The ID of the product for which to fetch positions.
 * @returns {Promise<any>} A promise that resolves to the data of product positions.
 */

export async function fetchWarehouseData(productId: string) {
    try {
        // Perform a GET request to fetch data for the specified product
        const response = await axios.get(`${BASE_URL}/products/${productId}/positions`, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        // Return the response data (product positions)
        return response.data;
    } catch (error) {
        // Log and rethrow any errors encountered during the API call
        console.error("Error fetching warehouse data:", error);
        throw error;
    }
}
