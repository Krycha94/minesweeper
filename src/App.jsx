import { useState } from "react";
import Board from "./components/Board";
import Panel from "./components/Panel";
import styles from "./App.module.css";

const DIFFICULTIES = {
	easy: {
		rows: 6,
		cols: 6,
		mines: 6,
	},
	medium: {
		rows: 8,
		cols: 8,
		mines: 10,
	},
	hard: {
		rows: 10,
		cols: 10,
		mines: 15,
	},
};

function App() {
	const [difficulty, setDifficulty] = useState("easy");
	const { rows, cols, mines } = DIFFICULTIES[difficulty];
	const [flagsRemaining, setFlagsRemaining] = useState(mines);
	const [resetTime, setResetTime] = useState(false);

	const resetTimer = () => {
		setResetTime(!resetTime);
	};

	return (
		<main>
			<div className={styles.container}>
				<h1 className={styles.title}>💣 Minesweeper</h1>
				<Panel
					flagsRemaining={flagsRemaining}
					setDifficulty={setDifficulty}
					difficulty={difficulty}
					resetTime={resetTime}
				/>
				<Board
					rows={rows}
					cols={cols}
					mines={mines}
					setFlagsRemaining={setFlagsRemaining}
					setDifficulty={setDifficulty}
					onResetTimer={resetTimer}
				/>
			</div>
		</main>
	);
}

export default App;
