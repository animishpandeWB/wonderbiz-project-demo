import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';


const Register: React.FC = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const loginPageBool:boolean = true;

    const handleRegister = () => {
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

        if(!usernameRegex.test(username)) {
            setUsernameError("Enter a valid username with minimum 7 characters");
        }else if(!emailRegex.test(email)) {
            setEmailError("Enter a valid email address");
        }else if(!passwordRegex.test(password)) {
            setPasswordError("Enter a valid password with minimum 8 characters and atleast 1 number and 1 letter");
        }else if(password !== confirmPassword) {
            setConfirmPasswordError("Passwords are not equal");
        }else {
            console.log(`Registered with email: ${email}, username: ${username} and password: ${password}`);
        }
    }
    const navigate = useNavigate();

    return (
        <div className='Register'>
            <Navbar loginPageBool = {loginPageBool}/>
            <div className='Register--Page'>
                <h2>User Registration</h2>
                <div className='Register--form'>
                    <p>Username:</p>
                    <input 
                        type='text' 
                        name='username' 
                        placeholder='Username' 
                        autoComplete='off' 
                        className='Form--username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    {usernameError && <span className='error-msg'>{usernameError}</span>}
                    <p>Email:</p>
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='Email' 
                        autoComplete='off' 
                        className='Form--email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    {emailError && <span className='error-msg'>{emailError}</span>}
                    <p>Password:</p>
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Password' 
                        className='Form--password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    {passwordError && <span className='error-msg'>{passwordError}</span>}
                    <p>Confirm Password:</p>
                    <input 
                        type='password' 
                        name='confirm-password' 
                        placeholder='Confirm Password' 
                        className='Form--confirm-password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />
                    {confirmPasswordError && <span className='error-msg'>{confirmPasswordError}</span>}
                    <button 
                        className='Form--submit-button'
                        onClick={handleRegister}    
                    >Register</button>
                    <button 
                        className='Form--submit-button'
                        onClick={() => navigate("/login")}    
                    >Login</button>
                </div>
            </div>
        </div>
    );
}

export default Register;