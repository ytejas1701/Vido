import styles from './Watch.module.css';
import VideoTile from './VideoTile';

import image from '../assets/proj1.png';
import CommentBox from './CommentBox';
import { useRef } from 'react';

const Watch = ()=>{
    const commentBoxRef = useRef(null);

    return (
        <div className={styles.watch}>
            <div className={styles.mainColumn}>
                <img src={image} className={styles.video}/>
                <div className={styles.title}>
                    titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle
                </div>
                <div className={styles.meta}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    <span>3K</span>
                    <svg
                        className={styles.action}
                        onClick={()=>commentBoxRef.current.scrollIntoView({behavior:"smooth"})}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>
                    <span>31</span>
                    <svg
                        className={styles.heart}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    <span>251</span>
                    <svg 
                        className={styles.action}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>
                    <span>12</span>
                </div>
                <div className={styles.description}>
                    descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription
                </div>
                <div className={styles.creatorName}>
                    <img src={image}/>
                    <div className={styles.info}>
                        <span>creator</span>
                        12 videos
                    </div>
                </div>
                <CommentBox commentBoxRef={commentBoxRef} />
            </div>
            <div className={styles.sideColumn}>
                <VideoTile isCollapsed={true}/>
                <VideoTile isCollapsed={true}/>
                <VideoTile isCollapsed={true}/>
                <VideoTile isCollapsed={true}/>
                <VideoTile isCollapsed={true}/>
                <VideoTile isCollapsed={true}/>
            </div>
        </div>
    );
}

export default Watch;