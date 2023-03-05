export const getAdjacentTiles = (tile, rows, cols, tiles) => {
	const { row, col } = tile;
	const adjacentTiles = [];

	// Check tiles to the left and right
	if (col > 0) adjacentTiles.push(getTile(row, col - 1, tiles));
	if (col < cols - 1) adjacentTiles.push(getTile(row, col + 1, tiles));

	// Check tiles above and below
	if (row > 0) adjacentTiles.push(getTile(row - 1, col, tiles));
	if (row < rows - 1) adjacentTiles.push(getTile(row + 1, col, tiles));

	// Check diagonal tiles
	if (row > 0 && col > 0) adjacentTiles.push(getTile(row - 1, col - 1, tiles));
	if (row > 0 && col < cols - 1)
		adjacentTiles.push(getTile(row - 1, col + 1, tiles));
	if (row < rows - 1 && col > 0)
		adjacentTiles.push(getTile(row + 1, col - 1, tiles));
	if (row < rows - 1 && col < cols - 1)
		adjacentTiles.push(getTile(row + 1, col + 1, tiles));

	return adjacentTiles;
};

const getTile = (row, col, tiles) => {
	return tiles.find((tile) => tile.row === row && tile.col === col);
};