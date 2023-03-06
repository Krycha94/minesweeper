import { useEffect, useRef } from "react";
import { formatTime } from "../utils/helpers";
import styles from "./Panel.module.css";

const Panel = ({ flagsRemaining }) => {
	const timeRef = useRef(null);

	useEffect(() => {
		let seconds = 0;
		const interval = setInterval(() => {
			seconds += 1;
			timeRef.current.textContent = formatTime(seconds);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className={styles.panel}>
			<select name="difficulty" id="difficulty">
				<option value="easy">Easy</option>
			</select>
			<div className={styles.info}>
				<p>🚩 {flagsRemaining}</p>
				<p>
					⌛ <span ref={timeRef}>00:00</span>
				</p>
			</div>
		</section>
	);
};

export default Panel;
