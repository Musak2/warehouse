# Warehouse Picking Optimization API

In the project directory, you can run:

### `npm install`

Installs the node_modules folder.

### `npm run dev`

Runs the server.\
By default, the server listens on [http://localhost:3000](http://localhost:3000).

Usage
Send a POST request to /optimize-picking with a payload containing product IDs and a starting position. The server will respond with the optimized picking order and the total distance of the path.
