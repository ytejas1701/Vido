import { Fragment, useEffect, useState } from 'react';
import styles from '../UI/Dropdown.module.css';

const NotificationMenu = ({notifications})=>{
    const token = localStorage.getItem("token");
    
    const deleteNotification = async (id)=>{
        try {
            const response = await fetch("http://localhost:8000/notification/"+id, {
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                }
            });
            if(!response.ok) throw new Error();
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        } 
    }
    return (
        <Fragment>
            {notifications.length===0
            ?<div className={styles.item}>
                <span className={styles.heading}>
                    No new notifications!
                </span>
            </div>
            :notifications.map(notification=>
                <div 
                    key={notification._id}
                    className={styles.item}>
                    {notification.type==="tag"?
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
                    </svg>:''}
                    {notification.type==="like"?
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>:''}
                    <div>
                        <span className={styles.heading}>
                        {notification.type==="tag"?"You were tagged!":""}
                        {notification.type==="like"?"Your video was liked!":""}
                            <svg
                            onClick={()=>deleteNotification(notification._id)}
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>    
                        </span>
                        <span className={styles.subheading}>{notification.body}</span>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default NotificationMenu;