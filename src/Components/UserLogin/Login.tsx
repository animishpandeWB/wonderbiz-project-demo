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


    const [userIdFromDb, setUserIdFromDb]: any = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiData, setApiData]: any[] = useState([]);
    const [loggedIn, SetLoggedIn] = useState('');
    const [checkPassword, setCheckPassword]: any[] = useState([]);
    const loginPageBool = true;
    const [checkUserPass, setCheckUserPass]: any = useState();
    let userId: any;


    useEffect(() => {
        api.get('/api/User').then(res => {
            setApiData(res.data);
        });
    }, []);
    // console.log(apiData.map((p: any) => console.log(p.userId)));


    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');
        // let userPassBool = false;

        const submitObject = {
            "email": email,
            "password": password
        }

        apiData.map((d: any) => {
            if (!email) {
                SetLoggedIn("Login Failed");
                setEmailError('Enter valid email');
                setPasswordError('Enter valid password');
            } else {
                userId = d.userId;
                const { id } = apiData.find((item: any) => item.email == email);
                console.log(id);
                // && password == d.password
                const payload = {
                    "userId": userId,
                    "password": password
                }
                axios.post('http://localhost:5148/api/UserAuth', {
                    userId: id,
                    password: password
                })
                    .then((response) => {
                        // console.log("User Login: " + response.data);
                        setCheckUserPass(response.data);
                        // userPassBool = response.data
                        if (!!response.data) {
                            // console.log(!!response.data);
                            navigate(`/home/${id}`);
                            // return;
                        } else {
                            SetLoggedIn("Login Failed");
                        }
                    })

            }

            // if (checkUserPass) {
            //     // console.log(userId);
            //     navigate(`/home/${id}`);
            //     // return;
            // } else {
            //     SetLoggedIn("Login Failed");
            // }
        });
    }

    const navigate = useNavigate();

    return (
        <div>
            {/* <Navbar loginPageBool={loginPageBool} mainId={userId} /> */}
            <div className='Login'>
                <span className='Login--header'>
                    <img src={companyLogo} alt="mainLogo" className='Login--mainLogo' />
                    <p className='Login--companyName'>StreamFlow Pumps</p>
                </span>
                <span className='Login--content'>
                    <h2 className='Login--heading'>User login</h2>
                    {loggedIn && <span className='error-msg'>{loggedIn}</span>}
                    <div className='Login--emailSpan'>
                        <label className='Login--labels' htmlFor='email'>Email:</label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            className='Login--username'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {emailError && <span className='error-msg'>{emailError}</span>}
                    <div className='Login--passwordSpan'>
                        <label className='Login--labels' htmlFor="password">Password:</label>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            className='Login--password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

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
                    <a href="/login" className='forgot-password'>Forgot Password?</a>
                </span>

            </div>
        </div>

    )
}

export { Login, UserContext };