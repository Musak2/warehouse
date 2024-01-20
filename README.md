# Warehouse Picking Optimization API

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
