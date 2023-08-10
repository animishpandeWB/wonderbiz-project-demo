import React, { useState, useEffect, useContext, createContext } from 'react';
import Navbar from '../Navbar';
// import Register from './Register';
import { useNavigate } from 'react-router-dom';
// import UserContext  from './UserContext';
import axios from 'axios';
// import { userInfo } from 'os';
import companyLogo from '../../Assets/Images/company-logo.jpg';
import './loginCss.css';

const api = axios.create({
    baseURL: `http://localhost:5148/`
})

let UserContext: any;
const Login: React.FC = () => {
 
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiData, setApiData]: any[] = useState([]);
    const [loggedIn, SetLoggedIn] = useState('');
    const loginPageBool = true;
    let userId: any;

    useEffect(() => {
        api.get('/api/User').then(res => {
            setApiData(res.data);
        });
    });

    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');

        const submitObject = {
            "email": email,
            "password": password
        }
        
        apiData.map((d: any) => {
            if(email === d.email && password == d.password) {
                userId = d.userId;
                navigate(`/home/${userId}`);
                return;
            }else {
                SetLoggedIn("Login Failed");
            }
        });
    }

    const navigate = useNavigate();

    return (
        <div>
            <Navbar loginPageBool = {loginPageBool} mainId={userId}/>
                <div className='Login'>
                    <span className='Login--header'>
                        <img src={companyLogo} alt="mainLogo" className='Login--mainLogo' />
                        <p className='Login--companyName'>StreamFlow Pumps</p>
                    </span>
                    <span className='Login--content'>
                        <h2 className='Login--heading'>User login</h2>
                        {loggedIn && <span className='error-msg'>{loggedIn}</span>}
                        <p className='Login--labels'>Email:</p>
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
                        <p className='Login--labels'>Password:</p>
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
                            {/* <button 
                                className='Register--user-button'
                                onClick={() => navigate("/user-register")}
                            >Register</button> */}
                        </div>
                        <a href="/user-register" className='forgot-password'>Sign Up</a>
                        <a href="/" className='forgot-password'>Forgot Password?</a>
                    </span>
                    
                </div>
        </div>
        
    )
}

export {Login, UserContext};