import styles from "./Modal.module.css";

const Modal = ({ message, onCloseModal }) => {
	return (
		<>
			<div className={styles.backdrop}></div>
			<div className={styles.modal}>
				<header className={styles.modalHeader}>
					<h2>{message || "Play Again"}</h2>
				</header>
				<footer className={styles.modalFooter}>
					<button onClick={onCloseModal} className={styles.modalBtn}>
						Play Again
					</button>
				</footer>
			</div>
		</>
	);
};
export default Modal;
