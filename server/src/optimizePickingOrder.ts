interface Position {
    positionId: string;
    x: number;
    y: number;
    z: number;
    productId: string;
    quantity: number;
}

interface StartingPosition {
    x: number;
    y: number;
    z: number;
}

function calculateManhattanDistance(a: Position | StartingPosition, b: Position | StartingPosition): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

export function findShortestPath(allProductsPositions: { productId: string; positions: Position[] }[], startingPosition: StartingPosition): { pickingOrder: { productId: string; positionId: string }[], totalDistance: number } {
    if (allProductsPositions.length === 0 || allProductsPositions.every(p => p.positions.length === 0)) {
        throw new Error("No positions available");
    }

    let currentPos = startingPosition;
    let totalDistance = 0;
    let pickingOrder: { productId: string; positionId: string }[] = [];
    let remainingProducts = [...allProductsPositions];

    while (remainingProducts.length > 0) {
        let nearestProduct = remainingProducts[0];
        let nearestPosition = nearestProduct.positions[0];
        let shortestDistance = calculateManhattanDistance(currentPos, nearestPosition);

        for (const product of remainingProducts) {
            for (const position of product.positions) {
                const distance = calculateManhattanDistance(currentPos, position);
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    nearestProduct = product;
                    nearestPosition = position;
                }
            }
        }

        totalDistance += shortestDistance;
        currentPos = nearestPosition;
        pickingOrder.push({ productId: nearestProduct.productId, positionId: nearestPosition.positionId });

        // Remove the picked product from the list of remaining products
        remainingProducts = remainingProducts.filter(p => p.productId !== nearestProduct.productId);
    }

    return { pickingOrder, totalDistance };
}




