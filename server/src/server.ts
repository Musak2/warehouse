import express from 'express';
import bodyParser from 'body-parser';
import { fetchWarehouseData } from './warehouseAPI';

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

      // For now, just returning the fetched data as the optimized path
      const optimizedPath = allProductPositions;

      res.json({ success: true, path: optimizedPath });
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
