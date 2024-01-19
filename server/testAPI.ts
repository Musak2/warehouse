import { fetchWarehouseData } from './src/warehouseAPI';

async function testFetchWarehouseData() {
    try {
        const productId = 'product-1'; // Replace with an actual product ID for testing
        const data = await fetchWarehouseData(productId);
        console.log('Warehouse Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

testFetchWarehouseData();
