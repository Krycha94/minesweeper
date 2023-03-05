import styles from "./Cell.module.css";

const Cell = ({
	isMine,
	isRevealed,
	isFlagged,
	adjacentMines,
	onLeftClick,
	onRightClick,
}) => {
	return (
		<button
			className={`${styles.cell} ${isRevealed ? styles.revealed : ""}`}
			onClick={onLeftClick}
			onContextMenu={onRightClick}
		>
			{isRevealed && isMine ? "💣" : isFlagged && "🚩"}
			{adjacentMines}
		</button>
	);
};

export default Cell;
