import styles from './Home.module.css';
import VideoTile from './VideoTile';

const Home = ()=>{
    return (
        <div className={styles.home}>
            <div className={styles.videos}>
                <VideoTile isCollapsed={false}/>
                <VideoTile isCollapsed={false}/>
                <VideoTile isCollapsed={false}/>
                <VideoTile isCollapsed={false}/>
                <VideoTile isCollapsed={false}/>
                <VideoTile isCollapsed={false}/>
                <VideoTile isCollapsed={false}/>
                <VideoTile isCollapsed={false}/>
            </div>
        </div>
    );
}

export default Home;