import styles from "./Cell.module.css";

const Cell = ({ isMine, isRevealed, isFlagged, adjacentBombs }) => {
	return (
		<button className={`${styles.cell} ${isRevealed ? styles.revealed : ""}`}>
			{isRevealed && isMine ? "💣" : isFlagged && "🚩"}
			{adjacentBombs}
		</button>
	);
};

export default Cell;
