// Interface for representing a position in the warehouse
interface Position {
    positionId: string;
    x: number;
    y: number;
    z: number;
    productId: string;
    quantity: number;
}

// Interface for representing the starting position
interface StartingPosition {
    x: number;
    y: number;
    z: number;
}

// Function to calculate the absolute Distance between two positions
function calculateAbsoluteDistance(a: Position | StartingPosition, b: Position | StartingPosition): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

// Function to find the shortest path for picking products
export function findShortestPath(allProductsPositions: { productId: string; positions: Position[] }[], startingPosition: StartingPosition): { pickingOrder: { productId: string; positionId: string }[], totalDistance: number } {
    // Check if there are no products or positions
    if (allProductsPositions.length === 0 || allProductsPositions.every(p => p.positions.length === 0)) {
        throw new Error("No positions available");
    }

    let currentPos = startingPosition;
    let totalDistance = 0;
    let pickingOrder: { productId: string; positionId: string }[] = [];
    let remainingProducts = [...allProductsPositions];

    // Iterate until all products are picked
    while (remainingProducts.length > 0) {
        let nearestProduct = remainingProducts[0];
        let nearestPosition = nearestProduct.positions[0];
        let shortestDistance = calculateAbsoluteDistance(currentPos, nearestPosition);

        // Find the nearest product position
        for (const product of remainingProducts) {
            for (const position of product.positions) {
                const distance = calculateAbsoluteDistance(currentPos, position);
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    nearestProduct = product;
                    nearestPosition = position;
                }
            }
        }

        // Update the total distance and current position
        totalDistance += shortestDistance;
        currentPos = nearestPosition;

        // Add the position to the picking order
        pickingOrder.push({ productId: nearestProduct.productId, positionId: nearestPosition.positionId });

        // Remove the picked product from the list of remaining products
        remainingProducts = remainingProducts.filter(p => p.productId !== nearestProduct.productId);
    }

    return { pickingOrder, totalDistance };
}




