import Board from "./components/Board";
import Panel from "./components/Panel";
import styles from "./App.module.css";

function App() {
	return (
		<main>
			<div className={styles.container}>
				<h1 className={styles.title}>💣 Minesweeper</h1>
				<Panel />
				<Board />
			</div>
		</main>
	);
}

export default App;
