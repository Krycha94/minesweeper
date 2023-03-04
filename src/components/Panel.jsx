import styles from "./Panel.module.css";

const Panel = () => {
	return (
		<section>
			<select name="difficulty" id="difficulty">
				<option value="easy">Easy</option>
			</select>
			<div className={styles.info}>
				<p>🚩 10</p>
				<p>⌛ 00:00</p>
			</div>
		</section>
	);
};

export default Panel;
