import Appbar from './Appbar';
import styles from'./CenterContent.module.css';

import {Outlet} from 'react-router-dom';
import Dropdown from './Dropdown';
import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import PostVideo from './PostVideo';

const CenterContent = ()=>{
    const useOutsideAlert = (ref, type)=>{
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

    const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    useOutsideAlert(dropdownRef);
    useOutsideAlert(modalRef);
    const [dropdown, setDropdown] = useState(null);
    const [modal, setModal] = useState(null);

    const showDropdownHandler = (items)=>
        setDropdown(
            <Dropdown dropdownRef={dropdownRef}>
                {items}
            </Dropdown>
        );

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