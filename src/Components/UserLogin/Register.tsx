import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import companyLogo from '../../Assets/Images/company-logo.jpg';

const api = axios.create({
    baseURL: `http://localhost:5148/`
})
const Register: React.FC = () => {
    const [getUserData, setGetUserData]: any[] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const loginPageBool: boolean = true;

    useEffect(() => {
        axios.get(`http://localhost:5148/api/User`)
            .then((res) => {
                setGetUserData(res.data);
            })
    }, []);
    console.log(getUserData);
    let userId = 0;
    getUserData.map((u: any) => {
        userId = u.userId;
    });
    console.log(userId);
    const handleRegister = () => {
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,29}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;



        if (!usernameRegex.test(username)) {
            setUsernameError("Enter a valid username with minimum 4 characters");
        } else if (!emailRegex.test(email)) {
            setEmailError("Enter a valid email address");
        } else if (!passwordRegex.test(password)) {
            setPasswordError("Enter a valid password with minimum 8 characters and atleast 1 number and 1 letter");
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords are not equal");
        } else {
            console.log(`Registered with email: ${email}, username: ${username} and password: ${password}`);
            const payload = {
                "id": 0,
                "userId": (userId + 1),
                "username": username,
                "email": email,
                "password": password,
                "pumps": null
            }
            // axios({
            //     method: 'post',
            //     url: 'http://localhost:5148/api/User',
            //     data: payload,
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });
            axios.post("http://localhost:5148/api/User", payload)
                .then((response) => {
                    console.log(response.data);
                    navigate("/login");
                })
            alert("Successfully Registered!");
        }
    }
    const navigate = useNavigate();
    const id: any = 1;
    return (
        <div className='Register'>
            <Navbar loginPageBool={loginPageBool} mainId={id} />
            <div className='Register--Page'>
                <span className='Login--header'>
                    <img src={companyLogo} alt="mainLogo" className='Login--mainLogo' />
                    <p className='Login--companyName'>StreamFlow Pumps</p>
                </span>
                <span className='Register--content'>
                    <h2>User Registration</h2>
                    <div className='Register--form'>
                        <div className='username--div'>
                            <label className='Register--labels' htmlFor="username">
                                Username:
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                placeholder='Username'
                                autoComplete='off'
                                className='Form--username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {usernameError && <span className='error-msg'>{usernameError}</span>}
                        <div className='email--div'>
                            <label className='Register--labels' htmlFor="email">
                                Email:
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email'
                                autoComplete='off'
                                className='Form--email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {emailError && <span className='error-msg'>{emailError}</span>}
                        <div className='password--div'>
                            <label className='Register--labels' htmlFor="password">
                                Password:
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Password'
                                className='Form--password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {passwordError && <span className='error-msg'>{passwordError}</span>}
                        <div className='confirmPassword--div'>
                            <label className='Register--labels' htmlFor="confirm-password">
                                Confirm Password:
                            </label>
                            <input
                                type='password'
                                id='confirm-password'
                                name='confirm-password'
                                placeholder='Confirm Password'
                                className='Form--confirm-password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {confirmPasswordError && <span className='error-msg'>{confirmPasswordError}</span>}
                        <button
                            className='Form--submit-button'
                            onClick={handleRegister}
                        >Register</button>
                        {/* <button 
                            className='Form--submit-button'
                            onClick={() => navigate("/login")}    
                        >Login</button> */}
                    </div>
                    <a href="/login" className='forgot-password'>Back to Login</a>
                </span>
            </div>
        </div>
    );
}

export default Register;