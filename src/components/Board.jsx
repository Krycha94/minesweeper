import { useEffect, useState } from "react";
import { getAdjacentCells } from "../utils/helpers";
import Cell from "./Cell";
import styles from "./Board.module.css";
import Modal from "./Modal";

const Board = ({ rows, cols, mines, setFlagsRemaining }) => {
	const [cells, setCells] = useState([]);
	const [gameOver, setGameOver] = useState({ type: true, message: "" });
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const revealAllCells = () => {
		setCells((prev) =>
			prev.map((c) => {
				return { ...c, isRevealed: true };
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

	const checkWin = () => {
		const checkCells = cells.filter(
			(c) => !c.isRevealed && !c.isFlagged && !c.isMine
		);

		if (checkCells.length === 0) {
			setGameOver({ type: true, message: "You Won!" });
			setIsModalOpen(true);
			revealAllCells();
		}
	};

	const resetGame = () => {
		setCells([]);
		setGameOver({ type: false, message: "" });
		setFlagsRemaining(mines);
		createCells();
	};

	const handleCloseModal = () => {
		resetGame();
		setIsModalOpen(false);
	};

	const handleLeftClick = (cell) => {
		if (cell.isFlagged || cell.isRevealed) return;

		if (cell.isMine) {
			revealAllCells();
			setGameOver({ type: true, message: "You Lost!" });
			setIsModalOpen(true);
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

		checkWin();
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
			{isModalOpen && gameOver.type && (
				<Modal message={gameOver.message} onCloseModal={handleCloseModal} />
			)}
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
