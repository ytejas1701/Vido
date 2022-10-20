import styles from './VideoTile.module.css';

import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';

const VideoTile = ({video, isCollapsed})=>{
    const userId = localStorage.getItem("userId");
    const isLiked = video.likedBy.includes(userId);
    return (
        <Link to={'/watch/'+video._id} className={`${styles.videoTile} ${isCollapsed?styles.collapsed:''}`}>
            <ReactPlayer
                width={isCollapsed?"80%":"100%"}
                height={isCollapsed?"120px":"200px"}
                light={"https://firebasestorage.googleapis.com/v0/b/vido-ea2da.appspot.com/o/thumbnails%2FScreenshot%2020-10-2022%2002_22_56.png?alt=media&token=28237c9a-0f3d-4095-9f12-cbbfd1924c49"}
                fallback={<div className={styles.loading}></div>}
                url='https://firebasestorage.googleapis.com/v0/b/vido-ea2da.appspot.com/o/Clouds%20-%2064759.mp4?alt=media&token=4dde0e17-d5c3-43a1-9bdb-c2e84111351c'/>
            <div className={styles.infoBox}>
                <span className={styles.title}>{video.title}</span>
                <span className={styles.creatorName}>{video.creatorName}</span>
                <div className={styles.metaInfo}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    <span>{video.views}</span>
                    <svg
                        className={isLiked?styles.liked:''}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    <span>{video.likes}</span>
                    <svg 
                        className={styles.share}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>
                    <span>{video.shares}</span>
                </div>
            </div>
        </Link>
    );
}

export default VideoTile;