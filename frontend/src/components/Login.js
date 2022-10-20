import { useRef, useState } from 'react';
import styles from '../UI/Modal.module.css';

const Login = ()=>{
    const [emailTag, setEmailTag] = useState('');
    const [passwordTag, setPasswordTag] = useState('');

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const [errorTag, setErrorTag] = useState('');
    const [messageTag, setMessageTag] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [isDisabled, setDisabled] = useState(false);

    const validate = ()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
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
        return ans;
    }

    const submitHandler = async (event)=>{
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(validate()){
            try {
                setDisabled(true);
                const response = await fetch("http://localhost:8000/user/login/",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email, password
                    })
                });
                if(!response.ok) throw new Error();
                const responseObject = await response.json();
                console.log(responseObject);
                localStorage.setItem("token", responseObject.token);
                localStorage.setItem("username", responseObject.firstName+' '+responseObject.lastName);
                localStorage.setItem("userId", responseObject._id);
                localStorage.setItem("role", responseObject.role);
                setErrorTag('');
                setMessageTag('Authentication Successful.');
                window.location.reload();
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
        <button disabled={isDisabled} onClick={submitHandler}>LOGIN</button>
        <label className={styles.tag}>{errorTag}</label>
        <label>{messageTag}</label>
    </form>
);
}

export default Login;