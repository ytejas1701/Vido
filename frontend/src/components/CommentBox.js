import styles from './CommentBox.module.css';
import Comment from './Comment';

import {useState} from 'react';

const CommentBox = ({commentBoxRef})=>{
    const [isHidden, setIshidden] = useState(false);
    return (
        <div ref={commentBoxRef} className={styles.commentBox}>
            <span className={styles.heading}>
                COMMENTS
                {!isHidden&&
                <svg
                    onClick={()=>setIshidden((prev)=>!prev)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>}
                {isHidden&&
                <svg
                    onClick={()=>setIshidden((prev)=>!prev)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>}
            </span>
            <div className={styles.addComment}>
                <textarea placeholder='Add Comment'/>
                <button>Add</button>
            </div>
            {!isHidden&&<Comment/>}
            {!isHidden&&<Comment/>}
            {!isHidden&&<Comment/>}
            {!isHidden&&<Comment/>}
        </div>
    )
}

export default CommentBox;