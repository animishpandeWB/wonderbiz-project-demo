import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
// import Register from './Register';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:5148/`
})
const baseURL = `http://localhost:5148`;

const Login: React.FC = () => {
 
    
    // console.log(getRequest);
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiData, setApiData]: any[] = useState([]);
    const loginPageBool = true;

    // useEffect(() => {
    //     axios.get(baseURL).then((res) => {
    //         setApiData(res.data);
    //     });
    // }, []);

    useEffect(() => {
        api.get('/api/User').then(res => {
            setApiData(res.data);
        });
        // console.log(apiData);
    }, []);

    
        
    

    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');

        const submitObject = {
            "email": email,
            "password": password
        }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

        // if(!emailRegex.test(email)) {
        //     setEmailError("Enter a valid email address");
        // }else if(!passwordRegex.test(password)) {
        //     setPasswordError("Enter a valid password with minimum 8 characters and atleast 1 number and 1 letter");
        // }else {
        //     console.log(submitObject);
        // }
        apiData.map((d: any) => {
            if(email === d.email && password == d.password) {
                navigate("/home");
            }else {
                alert("Login Failed");
            }
        });

        
    }

    // const handleRegister = () => {
    //     // console.log("New register page opening");
    //     // <Link to="/user-register"></Link>
    // }
    

    const navigate = useNavigate();

    return (
        <div>
            <Navbar loginPageBool = {loginPageBool}/>
            <div className='Login'>
                <h2 className='Login--heading'>User login</h2>
                    <p>Email:</p>
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='Email' 
                        autoComplete='off'
                        className='Login--username'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <span className='error-msg'>{emailError}</span>}
                    <p>Password:</p>
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Password' 
                        className='Login--password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <span className='error-msg'>{passwordError}</span>}
                    <br />
                    <div className='Login--buttons'>
                        <button 
                            className='Login--submit-button'
                            onClick={handleLogin}
                        >Submit</button>
                        <button 
                            className='Register--user-button'
                            onClick={() => navigate("/user-register")}
                        >Register</button>
                    </div>
                    <a href="/" className='forgot-password'>Forgot Password?</a>
            </div>
        </div>
        
    )
}

export default Login;