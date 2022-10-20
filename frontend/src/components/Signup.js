import { useRef, useState } from 'react';
import styles from '../UI/Modal.module.css';

const Signup = ()=>{
    const [emailTag, setEmailTag] = useState('');
    const [passwordTag, setPasswordTag] = useState('');
    const [firstNameTag, setFirstNameTag] = useState('');
    const [lastNameTag, setLastNameTag] = useState('');


    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);

    const [errorTag, setErrorTag] = useState('');
    const [messageTag, setMessageTag] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const [isDisabled, setDisabled] = useState(false);

    const validate = ()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;

        var ans = true;
        if(email===undefined||email===null||email===''){
            ans = false;
            setEmailValid(false);
            setEmailTag('Please provide an email.');
        }else{
            setEmailValid(true);
            setEmailTag('');
        }
        if(password===undefined||password===null||password===''){
            ans = false;
            setPasswordValid(false);
            setPasswordTag('Please provide a password.');
        }else{
            setPasswordValid(true);
            setPasswordTag('');
        }
        if(firstName===undefined||firstName===null||firstName===''){
            ans = false;
            setFirstNameValid(false);
            setFirstNameTag('Please enter your first name.');
        }else{
            setFirstNameValid(true);
            setFirstNameTag('');
        }
        if(lastName===undefined||lastName===null||lastName===''){
            ans = false;
            setLastNameValid(false);
            setLastNameTag('Please enter your last name');
        }else{
            setLastNameValid(true);
            setLastNameTag('');
        }

        return ans;
    }

    const submitHandler = async (event)=>{
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;

        if(validate()){
            try {
                setDisabled(true);
                const response = await fetch("http://localhost:8000/user/signup/",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email, password, firstName, lastName, role:'student'
                    })
                });
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                console.log(responseObject);
                setErrorTag('');
                setMessageTag('You have been successfully registered. Please Login to continue.');
            } catch (error) {
                setDisabled(false);
                setErrorTag('Could not authenticate. Please try again.');
                setMessageTag('');
                console.log(error);
            }
        }
    }

    return (
    <form>
        <label>First Name*</label>
        <input 
            ref={firstNameRef}
            className={firstNameValid?'':styles.error}/>
        <label className={styles.tag}>{firstNameTag}</label>
        <label>Last Name*</label>
        <input 
            ref={lastNameRef}
            className={lastNameValid?'':styles.error}/>
        <label className={styles.tag}>{lastNameTag}</label>
        <label>Email*</label>
        <input 
            ref={emailRef}
            className={emailValid?'':styles.error}/>
        <label className={styles.tag}>{emailTag}</label>
        <label>Password*</label>
        <input
            ref={passwordRef} 
            type={"password"} 
            className={passwordValid?'':styles.error}/>
        <label className={styles.tag}>{passwordTag}</label>
        <button disabled={isDisabled} onClick={submitHandler}>SIGNUP</button>
        <label className={styles.tag}>{errorTag}</label>
        <label>{messageTag}</label>
    </form>
);
}

export default Signup;