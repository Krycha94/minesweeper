import { useEffect, useState } from "react";
import Cell from "./Cell";
import styles from "./Board.module.css";

const Board = ({ rows, cols, mines }) => {
	const [cells, setCells] = useState([]);
	// console.log(cells);

	const createCells = () => {
		const newCells = [];

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				newCells.push({
					id: `${i}-${j}`,
					row: i,
					col: j,
					isMine: false,
					isRevealed: false,
					isFlagged: false,
					adjacentBombs: null,
				});
			}
		}

		//Generate random mines
		let minesPlaced = 0;
		while (minesPlaced < mines) {
			const index = Math.floor(Math.random() * (rows * cols));
			if (!newCells[index].isMine) {
				newCells[index].isMine = true;
				minesPlaced++;
			}
		}
		setCells(newCells);
	};

	useEffect(() => {
		createCells();
	}, []);

	return (
		<section className={styles.board}>
			{cells.map((cell) => (
				<Cell key={cell.id} {...cell} />
			))}
		</section>
	);
};

export default Board;
