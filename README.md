# Warehouse Picking Optimization API

This Node.js application leverages Express to create an API for optimizing the picking order of products in a warehouse. It calculates the most efficient path to pick specified products, enhancing warehouse operational efficiency.

In the project directory, you can run:

### `npm install`

Installs the node_modules folder.

### `npm run dev`

Runs the server.\
By default, the server listens on [http://localhost:3000](http://localhost:3000).

## Example Request Payload

Below is an example of the JSON payload to send with a POST request to the `/optimize-picking` endpoint:

```json
{
  "products": ["product-1", "product-2"],
  "startingPosition": { "x": 0, "y": 0, "z": 0 }
}
```

## Features

**Express Server Setup:** Initializes and runs an Express server to handle API requests.
**Warehouse Data Retrieval:** Fetches data about product positions within a warehouse from an external API.
**Picking Path Optimization:** Determines the shortest path for product picking, starting from a given position.
