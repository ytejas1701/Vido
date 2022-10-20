import styles from './Comment.module.css';

import {useRef, useState} from 'react';

const Comment =({comment, subComments, currentVideo})=>{
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const isUnauthenticated = token===''||token===null||token===undefined

    const [isLiked, setLiked] = useState(comment.likedBy.includes(userId));

    const updateComment = async (updates)=>{
        try {
            const response = await fetch('http://localhost:8000/comment/'+comment._id, {
                method:'PATCH',
                headers:{
                    'Authorization': 'Bearer '+token,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(updates)
            });
            if(!response.ok) throw new Error();
        } catch (error) {
            console.log(error.message);
        }
    }
    const addCommentRef = useRef(null);
    const [isDisabled, setDisabled] = useState(true);

    const [showForm, setShowForm] = useState(false);

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
                    videoId:comment.videoId,
                    parentId:comment._id
                })
            });
            if(!response.ok) throw new Error();
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.comment}>
                <span className={`${styles.username} ${comment.userId===currentVideo.creatorId?styles.poster:''}`}>
                {comment.username}
            </span>
            <div className={styles.body}>
                {comment.body}
            </div>
            <div className={styles.meta}>
                <svg
                    onClick={()=>{
                        if(!isUnauthenticated){
                            if(!isLiked){
                                updateComment({likes:comment.likes+1, likedBy:[...comment.likedBy, userId]});
                                setLiked(true);
                                comment.likes++;
                            }else{
                                updateComment({likes:comment.likes-1, likedBy:comment.likedBy.filter(id=>id!==userId)});
                                setLiked(false);
                                comment.likes--;
                            }
                        }
                    }}
                    className={`${styles.heart} ${isLiked?styles.liked:''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                <span>{comment.likes}</span>
                {!isUnauthenticated&&
                <svg
                    onClick={()=>setShowForm((state)=>!state)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>}
            </div>
            {showForm&&<div className={styles.addComment}>
                <textarea
                    onKeyUp={()=>{
                        if(addCommentRef.current.value==="")setDisabled(true)
                        else setDisabled(false);
                    }}
                    ref={addCommentRef} 
                    placeholder={"Add Comment"}/>
                <button
                    onClick={submitHandler} 
                    disabled={isDisabled}>Add</button>
            </div>}
            {subComments.map(subComment=><div className={styles.subComment}>
                <span className={`${styles.username} ${subComment.userId===currentVideo.creatorId?styles.poster:''}`}>
                    {subComment.username}
                </span>
                <div className={styles.body}>
                    {subComment.body}
                </div>
            </div>)}
        </div>
    );
}

export default Comment;