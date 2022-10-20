import { useRef, useState } from 'react';
import styles from '../UI/Modal.module.css';

const PostVideo = ()=>{
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const videoRef = useRef(null);
    const thumbnailRef = useRef(null);

    const [titleTag, setTitleTag] = useState('');
    const [descriptionTag, setDescriptionTag] = useState('');
    const [videoTag, setVideoTag] = useState('');
    const [thumbnailTag, setThumbnailTag] = useState('');

    const [titleValid, setTitleValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [videoValid, setVideoValid] = useState(true);
    const [thumbnailValid, setThumbnailValid] = useState(true);

    const [errorTag, setErrorTag] = useState('');
    const [messageTag, setMessageTag] = useState('');

    const validate = ()=>{
        var ans = true;
        if(!titleRef.current.value){
            setTitleTag('Please provide a title');
            setTitleValid(false);
            ans = false;
        }else{
            setTitleTag('');
            setTitleValid(true);
        }
        if(!descriptionRef.current.value){
            setDescriptionTag('Please provide a description');
            setDescriptionValid(false);
            ans = false;
        }else{
            setDescriptionTag('');
            setDescriptionValid(true);
        }
        if(!videoRef.current.files[0]){
            setVideoTag('Please upload a video');
            setVideoValid(false);
            ans = false;
        }else{
            setVideoTag('');
            setVideoValid(true);
        }
        if(!thumbnailRef.current.files[0]){
            setThumbnailTag('Please upload a thumbnail');
            setThumbnailValid(false);
            ans = false;
        }else{
            setThumbnailTag('');
            setThumbnailValid(true);
        }
        return ans;
    }

    const submitHandler = async (event)=>{
        event.preventDefault();
        if(validate()){
            try {
                const response = await fetch("http://localhost:8000/video", {
                    method:"POST",
                    headers:{
                        'Authorization': 'Bearer ' + token,
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        title:titleRef.current.value,
                        description:descriptionRef.current.value,
                        creatorName:username,
                        creatorId:userId,
                    })
                });
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                console.log(responseObject);
                setMessageTag('Video Posted!');
                setErrorTag('');
                window.location.reload();
            } catch (error) {
                setErrorTag('Something went wrong. Please try again.');
                setMessageTag('');
                console.log("error.message");
            }
        }
    }

    return (
    <form>
        <label>Upload Video</label>
        <input 
            ref={videoRef}
            className={styles.uploadFile} 
            type='file'/>
        <label className={styles.tag}>{videoTag}</label>
        <label>Upload Thumbnail</label>
        <input
            ref={thumbnailRef} 
            className={styles.uploadFile} 
            type='file'/>
        <label className={styles.tag}>{thumbnailTag}</label>
        <input
            ref={titleRef} 
            placeholder='Title'/>
        <label className={styles.tag}>{titleTag}</label>
        <textarea
            ref={descriptionRef} 
            placeholder='Description'/>
        <label className={styles.tag}>{descriptionTag}</label>
        <button onClick={submitHandler}>Post</button>
        <label className={styles.tag}>{errorTag}</label>
        <label>{messageTag}</label>
    </form>
);
}

export default PostVideo;