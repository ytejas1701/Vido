import Appbar from './Appbar';
import styles from'./CenterContent.module.css';

import {Outlet} from 'react-router-dom';
import Dropdown from '../UI/Dropdown';
import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import UserMenu from '../components/UserMenu';
import NotificationMenu from '../components/NotificationMenu';

const CenterContent = ()=>{
    const token = localStorage.getItem("token");
    const useOutsideAlert = (ref)=>{
        useEffect(()=>{
            const outsideClickHandler = (event)=>{
                if(ref.current && !ref.current.contains(event.target)){
                    setDropdown(null);
                    setModal(null);
                }
            }
            document.addEventListener("mousedown", outsideClickHandler);
            return ()=> document.removeEventListener("mousedown", outsideClickHandler);
            
        }, [ref])
    }

    const [notifications, setNotifications] = useState([]);
    useEffect(()=>{
        const fetchNotifications = async ()=>{
            try {
                const response = await fetch("http://localhost:8000/notification", {
                    method:"GET",
                    headers:{
                        "Authorization":"Bearer "+token,
                    }
                });
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                setNotifications(responseObject);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNotifications();
    },[token]);

    const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    useOutsideAlert(dropdownRef);
    useOutsideAlert(modalRef);
    const [dropdown, setDropdown] = useState(null);
    const [modal, setModal] = useState(null);

    const showDropdownHandler = (type)=>{
        if(type==="user") setDropdown(
            <Dropdown dropdownRef={dropdownRef}>
                <UserMenu/>
            </Dropdown>
        );
        if(type==="notification") setDropdown(
            <Dropdown dropdownRef={dropdownRef}>
                <NotificationMenu notifications={notifications}/>
            </Dropdown>
        )
    }

    const showModalHandler = (items)=>
        setModal(
            <Modal modalRef={modalRef}>
                {items}
            </Modal>
        );

    return (
        <div className={styles.centerContent}>
            <Appbar showDropdown={showDropdownHandler} showModal={showModalHandler}/>
            {dropdown}
            {modal}
            <div className={styles.outlet}>
                <Outlet/>            
            </div>
        </div>
    );
}

export default CenterContent;