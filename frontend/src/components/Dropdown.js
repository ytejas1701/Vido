import styles from './Dropdown.module.css';

const Dropdown = ({dropdownRef, children})=>{
    return (
        <div
            ref={dropdownRef} 
            className={styles.dropdown}>
            {children}
        </div>
    );
}

export default Dropdown;