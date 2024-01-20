import express from 'express';
import bodyParser from 'body-parser';
import { fetchWarehouseData } from './warehouseAPI';
import { findShortestPath } from './optimizePickingOrder';

// Set the port for the server
const port = 3000;

// Initialize the express application
const app = express();

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a GET route for the root path
app.get('/', (req, res) => {
    res.send('Picking Optimization');
});

// Define a POST route to optimize the picking order of products
app.post('/optimize-picking', async (req, res) => {
    // Extract products and startingPosition from the request body
    const { products, startingPosition } = req.body;

    try {
        // Array to hold product positions
        let allProductPositions = [];

        // Fetch the positions of each product and add to allProductPositions
        for (const productId of products) {
            const positions = await fetchWarehouseData(productId);
            allProductPositions.push({ productId, positions });
        }

        // Calculate the shortest path for picking the products
        const result = findShortestPath(allProductPositions, startingPosition);

        // Respond with the calculated picking order and total distance
        res.json({ pickingOrder: result.pickingOrder, distance: result.totalDistance });
    } catch (error) {
        // Handle any errors that occur during the process
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
