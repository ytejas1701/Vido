import styles from './CommentBox.module.css';
import Comment from './Comment';

import {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';

const CommentBox = ({commentBoxRef, updateVideo, currentVideo})=>{
    const {id} = useParams();

    const [isHidden, setIshidden] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const addCommentRef = useRef(null);
    const [isDisabled, setDisabled] = useState(true);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const isUnauthenticated = token===''||token===null||token===undefined

    const submitHandler = async()=>{
        try {
                const response = await fetch("http://localhost:8000/comment/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ token,
                },
                body:JSON.stringify({
                    body:addCommentRef.current.value,
                    username,
                    userId,
                    videoId:id
                })
            });
            if(!response.ok) throw new Error();
            updateVideo({comments:currentVideo.comments+1})
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        const initialize = async ()=>{
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8000/video/"+id+"/comment");
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                setComments(responseObject);
                setLoading(false);
            } catch (error) {
                setLoading(true);
                console.log(error.message);
            }
        }
        initialize();
    },[id]);

    return (
        <div ref={commentBoxRef} className={styles.commentBox}>
            <span className={styles.heading}>
                COMMENTS
                {!isHidden&&
                <svg
                    onClick={()=>setIshidden((prev)=>!prev)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>}
                {isHidden&&
                <svg
                    onClick={()=>setIshidden((prev)=>!prev)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>}
            </span>
            {!isUnauthenticated&&
            <div className={styles.addComment}>
                <textarea 
                    ref={addCommentRef}
                    onKeyUp={()=>{
                        if(addCommentRef.current.value==="")setDisabled(true)
                        else setDisabled(false);
                    }}
                    placeholder='Add Comment'/>
                <button onClick={submitHandler} disabled={isDisabled}>Add</button>
            </div>}
            {!isLoading&&!isHidden&&
            comments.filter(comment=>comment.parentId===null).map(comment=>
                <Comment 
                    key={comment._id}
                    currentVideo={currentVideo}
                    comment={comment}
                    subComments={comments.filter(subComment=>subComment.parentId===comment._id)}/>
            )}
        </div>
    )
}

export default CommentBox;