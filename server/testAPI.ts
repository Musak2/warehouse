import { fetchWarehouseData } from './src/warehouseAPI';

async function testFetchWarehouseData() {
    try {
        const productId = 'product-2';
        const data = await fetchWarehouseData(productId);
        console.log('Warehouse Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

testFetchWarehouseData();
