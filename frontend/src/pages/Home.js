import styles from './Home.module.css';
import VideoTile from '../components/VideoTile';
import { useEffect, useState } from 'react';

const Home = ()=>{
    const [videos, setVideos] = useState([]);
    
    useEffect(()=>{
        const fetchVideos = async ()=>{
            try {
                const response = await fetch('http://localhost:8000/video');
                if(!response.ok)throw new Error();
                const responseObject = await response.json();
                console.log(responseObject);
                setVideos(responseObject);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchVideos();
    },[]);

    return (
        <div className={styles.home}>
            <div className={styles.videos}>
                {videos.map(video=>(
                    <VideoTile 
                        key={video._id} 
                        video={video} 
                        isCollapsed={false}/>
                ))}
            </div>
        </div>
    );
}

export default Home;