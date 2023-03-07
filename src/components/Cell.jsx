import styles from "./Cell.module.css";

const Cell = ({
	isMine,
	isRevealed,
	isFlagged,
	adjacentMines,
	onLeftClick,
	onRightClick,
}) => {
	let cellTextColor;
	if (adjacentMines === 1) {
		cellTextColor = <span style={{ color: "blue" }}>{adjacentMines}</span>;
	} else if (adjacentMines === 2) {
		cellTextColor = <span style={{ color: "green" }}>{adjacentMines}</span>;
	} else if (adjacentMines === 3) {
		cellTextColor = <span style={{ color: "red" }}>{adjacentMines}</span>;
	} else {
		cellTextColor = <span style={{ color: "purple" }}>{adjacentMines}</span>;
	}

	return (
		<button
			aria-label="cell"
			className={`${styles.cell} ${isRevealed ? styles.revealed : ""}`}
			onClick={onLeftClick}
			onContextMenu={onRightClick}
		>
			{isRevealed && isMine ? "💣" : isFlagged && "🚩"}
			{cellTextColor}
		</button>
	);
};

export default Cell;
