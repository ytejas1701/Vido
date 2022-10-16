import Appbar from './Appbar';
import styles from'./CenterContent.module.css';

import {Outlet} from 'react-router-dom';
import Dropdown from './Dropdown';
import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';

const CenterContent = ()=>{
    const useOutsideAlert = (ref)=>{
        useEffect(()=>{
            const outsideClickHandler = (event)=>{
                if(ref.current && !ref.current.contains(event.target)){
                    setDropdown(null);
                }
            }
            document.addEventListener("mousedown", outsideClickHandler);
            return ()=> document.removeEventListener("mousedown", outsideClickHandler);
            
        }, [ref])
    }

    const dropdownRef = useRef(null);
    useOutsideAlert(dropdownRef);

    const [dropdown, setDropdown] = useState(null);

    const showDropdownHandler = (items)=>
        setDropdown(
            <Dropdown dropdownRef={dropdownRef}>
                {items}
            </Dropdown>
        );

    return (
        <div className={styles.centerContent}>
            <Appbar showDropdown={showDropdownHandler}/>
            {dropdown}
            <Modal/>
            <div className={styles.outlet}>
                <Outlet/>            
            </div>
        </div>
    );
}

export default CenterContent;