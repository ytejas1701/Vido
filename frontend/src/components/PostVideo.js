import styles from '../UI/Modal.module.css';

const PostVideo = ()=>{
    return (
    <form>
        <label>Upload your video*</label>
        <div className={styles.box}>
        </div>
        <span>UPLOAD</span>
        <label>Choose a Title*</label>
        <input/>
        <label>Add a Description*</label>
        <textarea/>
        <button>Post</button>
    </form>
);
}

export default PostVideo;