import { useEffect, useState } from "react";
import { getAdjacentCells } from "../utils/helpers";
import Cell from "./Cell";
import styles from "./Board.module.css";

const Board = ({ rows, cols, mines, setFlagsRemaining }) => {
	const [cells, setCells] = useState([]);

	const createCells = () => {
		const newCells = [];

		//Generate board
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				newCells.push({
					id: `${i}-${j}`,
					row: i,
					col: j,
					isMine: false,
					isRevealed: false,
					isFlagged: false,
					adjacentMines: null,
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

	const revealCell = (id) => {
		setCells((prev) =>
			prev.map((c) => {
				if (c.id === id) {
					return { ...c, isRevealed: true };
				} else {
					return c;
				}
			})
		);
	};

	const flagCell = (id) => {
		setCells((prev) =>
			prev.map((c) => {
				if (c.id === id) {
					return { ...c, isFlagged: !c.isFlagged };
				} else {
					return c;
				}
			})
		);
	};

	const handleLeftClick = (cell) => {
		if (cell.isFlagged || cell.isRevealed) return;

		if (cell.isMine) {
			alert("game over");
			return;
		}

		cell.isRevealed = true;
		revealCell(cell.id);

		//Check adjacent cells for mines number
		const adjacentCells = getAdjacentCells(cell, rows, cols, cells);
		const adjacentMinesNumber = adjacentCells.filter((c) => c.isMine).length;

		if (adjacentMinesNumber === 0) {
			//Recursion cells that dont have mines and are not revealed
			adjacentCells.forEach((c) => {
				if (!c.isMine && !c.isRevealed) {
					handleLeftClick(c);
				}
			});
		} else {
			//Update cells to show number of adjacent bombs
			cell.adjacentMines = adjacentMinesNumber;
			setCells((prev) =>
				prev.map((c) => {
					if (c.id === cell.id) {
						return { ...c, adjacentCells: adjacentMinesNumber };
					} else {
						return c;
					}
				})
			);
		}
	};

	const handleRightClick = (event, cell) => {
		event.preventDefault();

		if (cell.isRevealed) return;

		if (cell.isFlagged) {
			setFlagsRemaining((prev) => prev + 1);
		} else {
			setFlagsRemaining((prev) => prev - 1);
		}

		flagCell(cell.id);
	};

	useEffect(() => {
		createCells();
	}, []);

	return (
		<section className={styles.board}>
			{cells.map((cell) => (
				<Cell
					key={cell.id}
					{...cell}
					onLeftClick={() => handleLeftClick(cell)}
					onRightClick={(e) => handleRightClick(e, cell)}
				/>
			))}
		</section>
	);
};

export default Board;
