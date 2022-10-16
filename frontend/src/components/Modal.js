import styles from './Modal.module.css';

const Modal = ()=>{
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <label>Upload your video</label>
                <button>Upload</button>
                <label>Upload a thumbnail</label>
                <button>Upload</button>
                <label>Choose a Title</label>
                <input/>
                <label>Add a Description</label>
                <textarea/>
                <button>Post</button>
            </div>
        </div>
    );
}

export default Modal;