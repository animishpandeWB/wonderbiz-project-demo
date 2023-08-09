import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar';
import Sidebar from './Sidebar';
import '../../App.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const baseURL1 = `http://localhost:5148/api/User`;
const baseURL2 = `http://localhost:5148/api/Pump`;

const ProfilePage: React.FC = () => {
    const loginPageBool = false;
    const [userData, setUserData]: any[] = useState([]);
    const [pumpToUser, setPumpToUser]: any[] = useState([]);
    const {id}: any = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5148/api/User/${id}`)
            .then((res) => {
                setUserData(res.data);
            })
    }, [])
    const userId: any = userData.userId;
    // console.log(userId);
    // console.log(userId);
    // useEffect(() => {
    //     axios.get(baseURL2)
    //         .then((res) => {
    //             setPumpToUser(res.data);
    //         })
    // }, [])

    // console.log(userData);
    // console.log(pumpToUser.map((p: any) => {
    //     console.log(p.userId);
    // }));
    return (
        <div>
            <NavBar loginPageBool={loginPageBool} mainId = {userId}/>
            <div className='ProfilePage'>
                <Sidebar {...id}/>
                <div className='Profile'>
                    <p className='Profile--header'>User Profile</p>
                    <div className='Profile--details'>
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;