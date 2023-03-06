import styles from "./Modal.module.css";

const Modal = ({ message, onCloseModal }) => {
	return (
		<>
			<div className={styles.backdrop} onClick={onCloseModal}></div>
			<div className={styles.modal}>
				<h2>{message || "Play Again"}</h2>
				<button onClick={onCloseModal}>Play Again</button>
			</div>
		</>
	);
};
export default Modal;
