import styles from './Watch.module.css';
import VideoTile from '../components/VideoTile';

import image from '../assets/proj1.png';
import CommentBox from '../components/CommentBox';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const Watch = ()=>{
    const [isLoading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState();
    const commentBoxRef = useRef(null);

    const [moreVideos, setMoreVideos] = useState([]);

    const {id} = useParams();
    useEffect(()=>{
        const initialize = async ()=>{
            try {
                setLoading(true);
                const currentVideoResponse = await fetch('http://localhost:8000/video/' + id);
                if(!currentVideoResponse.ok)throw new Error();
                const currentVideoResponseObject = await currentVideoResponse.json();

                const moreVideosResponse = await fetch('http://localhost:8000/user/'+currentVideoResponseObject.creatorId+'/video');
                if(!moreVideosResponse.ok)throw new Error();
                const moreVideosResponseObject = await moreVideosResponse.json();

                setCurrentVideo(currentVideoResponseObject);
                setMoreVideos(moreVideosResponseObject);
                setLoading(false);
            } catch (error) {
                setLoading(true);
                console.log(error.message);
            }
        }        
        initialize();
    },[id]);

    return (
        <div className={styles.watch}>
            <div className={styles.mainColumn}>
                <img src={image} className={styles.video}/>
                {!isLoading&&<div className={styles.title}>
                    {currentVideo.title}
                </div>}
                {!isLoading&&<div className={styles.meta}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    <span>{currentVideo.views}</span>
                    <svg
                        className={styles.action}
                        onClick={()=>commentBoxRef.current.scrollIntoView({behavior:"smooth"})}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>
                    <span>{currentVideo.comments}</span>
                    <svg
                        className={styles.heart}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    <span>{currentVideo.likes}</span>
                    <svg 
                        className={styles.action}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>
                    <span>{currentVideo.shares}</span>
                </div>}
                {!isLoading&&<div className={styles.description}>
                    {currentVideo.description}
                </div>}
                {!isLoading&&
                <div className={styles.creatorName}>
                    <img src={image}/>
                    <div className={styles.info}>
                        <span>{currentVideo.creatorName}</span>
                        {moreVideos.length} {moreVideos.length===1?' video':'videos'}
                    </div>
                </div>}
                {!isLoading&&<CommentBox commentBoxRef={commentBoxRef} />}
            </div>
            <div className={styles.sideColumn}>
                {!isLoading&&moreVideos
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