export const getAdjacentCells = (cell, rows, cols, cells) => {
	const { row, col } = cell;
	const adjacentCells = [];

	// Check left and right cells
	if (col > 0) adjacentCells.push(getTile(row, col - 1, cells));
	if (col < cols - 1) adjacentCells.push(getTile(row, col + 1, cells));

	// Check up and down cells
	if (row > 0) adjacentCells.push(getTile(row - 1, col, cells));
	if (row < rows - 1) adjacentCells.push(getTile(row + 1, col, cells));

	// Check diagonal cells
	if (row > 0 && col > 0) adjacentCells.push(getTile(row - 1, col - 1, cells));
	if (row > 0 && col < cols - 1)
		adjacentCells.push(getTile(row - 1, col + 1, cells));
	if (row < rows - 1 && col > 0)
		adjacentCells.push(getTile(row + 1, col - 1, cells));
	if (row < rows - 1 && col < cols - 1)
		adjacentCells.push(getTile(row + 1, col + 1, cells));

	return adjacentCells;
};

const getTile = (row, col, cells) =>
	cells.find((c) => c.row === row && c.col === col);

export const formatTime = (time) =>
	new Date(time * 1000).toISOString().substring(14, 19);
