import { useState } from "react";
import Board from "./components/Board";
import Panel from "./components/Panel";
import styles from "./App.module.css";

function App() {
	const [flagsRemaining, setFlagsRemaining] = useState(5);

	return (
		<main>
			<div className={styles.container}>
				<h1 className={styles.title}>💣 Minesweeper</h1>
				<Panel flagsRemaining={flagsRemaining} />
				<Board
					rows={8}
					cols={8}
					mines={5}
					setFlagsRemaining={setFlagsRemaining}
				/>
			</div>
		</main>
	);
}

export default App;
