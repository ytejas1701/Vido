import styles from './Watch.module.css';
import VideoTile from '../components/VideoTile';

import image from '../assets/proj1.png';
import CommentBox from '../components/CommentBox';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import ReactPlayer from 'react-player/lazy';

const Watch = ()=>{
    const [videoLoading, setVideoLoading] = useState(true);
    const [moreVideosLoading, setMoreVideosLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState();
    const [isLiked, setLiked] = useState(false);
    const commentBoxRef = useRef(null);

    const [moreVideos, setMoreVideos] = useState([]);

    const {id} = useParams();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const isUnauthenticated = token===''||token===null||token===undefined

    const updateVideo = async (updates)=>{
        const response = await fetch('http://localhost:8000/video/'+id, {
            method:'PATCH',
            headers:{
                'Authorization': 'Bearer '+token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updates)
        });
    }

    const createNotification = async ()=>{
        const response = await fetch('http://localhost:8000/notification/', {
            method:'POST',
            headers:{
                'Authorization': 'Bearer '+token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                body:currentVideo.title,
                userId:currentVideo.creatorId,
                link:'/',
                type:"like"
            })
        });
    }

    useEffect(()=>{
        const initialize = async ()=>{
            try {
                setVideoLoading(true);
                setMoreVideosLoading(true);

                const currentVideoResponse = await fetch('http://localhost:8000/video/' + id);
                if(!currentVideoResponse.ok)throw new Error();
                const currentVideoResponseObject = await currentVideoResponse.json();

                setCurrentVideo(currentVideoResponseObject);
                setLiked(currentVideoResponseObject.likedBy.includes(userId));
                setVideoLoading(false);
                updateVideo({views:currentVideoResponseObject.views+1});

                const moreVideosResponse = await fetch('http://localhost:8000/user/'+currentVideoResponseObject.creatorId+'/video');
                if(!moreVideosResponse.ok)throw new Error();
                const moreVideosResponseObject = await moreVideosResponse.json();

                setMoreVideos(moreVideosResponseObject);
                setMoreVideosLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        }        
        initialize();
    },[id]);

    return (
        <div className={styles.watch}>
            <div className={styles.mainColumn}>
                <ReactPlayer
                    width={"100%"}
                    height={"480px"}
                    playing={true}
                    controls={true}
                    fallback={<div className={styles.loading}></div>}
                    url='https://firebasestorage.googleapis.com/v0/b/vido-ea2da.appspot.com/o/videos%2FClouds%20-%2064759.mp4?alt=media&token=10413b15-986c-4755-9af0-dca3e5167f59'/>
                {!videoLoading&&<div className={styles.title}>
                    {currentVideo.title}
                </div>}
                {!videoLoading&&<div className={styles.meta}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    <span>{currentVideo.views}</span>
                    <svg
                        className={`${styles.heart} ${isLiked?styles.liked:''}`}
                        onClick={()=>{
                            if(!isUnauthenticated){
                                if(!isLiked){
                                    updateVideo({likes:currentVideo.likes+1, likedBy:[...currentVideo.likedBy, userId]});
                                    createNotification();
                                    setLiked(true);
                                    currentVideo.likes++;
                                }else{
                                    updateVideo({likes:currentVideo.likes-1, likedBy:currentVideo.likedBy.filter(id=>id!==userId)});
                                    setLiked(false);
                                    currentVideo.likes--;
                                }
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    <span>{currentVideo.likes}</span>
                    <svg
                        onClick={()=>{
                            updateVideo({shares:currentVideo.shares+1})
                            currentVideo.shares++
                        }}
                        className={styles.action}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>
                    <span>{currentVideo.shares}</span>
                </div>}
                {!videoLoading&&<div className={styles.description}>
                    {currentVideo.description}
                </div>}
                {!videoLoading&&
                <div className={styles.creatorName}>
                    <div className={styles.info}>
                        <span>{currentVideo.creatorName}</span>
                        {moreVideos.length} {moreVideos.length===1?' video':'videos'}
                    </div>
                </div>}
                <CommentBox currentVideo={currentVideo} updateVideo={updateVideo} commentBoxRef={commentBoxRef} />
            </div>
            <div className={styles.sideColumn}>
                {!moreVideosLoading&&moreVideos
                .filter(video=>video._id!==currentVideo._id)
                .map(video=>
                    <VideoTile 
                        key={video._id} 
                        video={video} 
                        isCollapsed={true}/>
                    )}
            </div>
        </div>
    );
}

export default Watch;