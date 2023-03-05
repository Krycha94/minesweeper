import styles from "./Panel.module.css";

const Panel = ({ flagsRemaining }) => {
	return (
		<section className={styles.panel}>
			<select name="difficulty" id="difficulty">
				<option value="easy">Easy</option>
			</select>
			<div className={styles.info}>
				<p>🚩 {flagsRemaining}</p>
				<p>⌛ 00:00</p>
			</div>
		</section>
	);
};

export default Panel;
