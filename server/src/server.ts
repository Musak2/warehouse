import express from 'express';
import bodyParser from 'body-parser';
import { fetchWarehouseData } from './warehouseAPI';
import { findShortestPath } from './optimizePickingOrder';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.post('/optimize-picking', async (req, res) => {
    const { products, startingPosition } = req.body;

    try {
        let allProductPositions = [];

        for (const productId of products) {
            const positions = await fetchWarehouseData(productId);
            allProductPositions.push({ productId, positions });
        }

        const result = findShortestPath(allProductPositions, startingPosition);

        // console.log("Products: \n", JSON.stringify(allProductPositions, null, 2));
        // console.log("Shortest Path: \n", result);

        res.json({ pickingOrder: result.pickingOrder, distance: result.totalDistance });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
