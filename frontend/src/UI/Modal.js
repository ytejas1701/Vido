import styles from './Modal.module.css';

const Modal = ({modalRef, children})=>{
    return (
        <div className={styles.modal}>
            <div className={styles.content} ref={modalRef}>
                {children}
            </div>
        </div>
    );
}

export default Modal;