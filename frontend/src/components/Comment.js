import styles from './Comment.module.css';

import {useState} from 'react';

const Comment =()=>{
    const [showForm, setShowForm] = useState(false);
    return (
        <div className={styles.comment}>
            <span className={styles.username}>
                username
            </span>
            <div className={styles.body}>
                bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody
            </div>
            <div className={styles.meta}>
                <svg
                    className={styles.heart}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                <span>251</span>
                <svg
                    onClick={()=>setShowForm((state)=>!state)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
                <span>31</span>
            </div>
            {showForm&&<div className={styles.addComment}>
                <textarea placeholder={"Add Comment"}/>
                <button>Add</button>
            </div>}
            <div className={styles.subComment}>
                <span className={styles.username}>
                    username
                </span>
                <div className={styles.body}>
                    bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody
                </div>
            </div>
            <div className={styles.subComment}>
                <span className={styles.username}>
                    username
                </span>
                <div className={styles.body}>
                    bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody
                </div>
            </div>
        </div>
    );
}

export default Comment;