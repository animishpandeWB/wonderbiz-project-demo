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
    const { id }: any = useParams();
    let homePageToggle = true;

    useEffect(() => {
        axios.get(`http://localhost:5148/api/User/${id}`)
            .then((res) => {
                setUserData(res.data);
            })
    }, [])
    const userId: any = userData.userId;
    let prop = {
        id: id,
        homePageToggle
    }
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
            <NavBar loginPageBool={loginPageBool} mainId={userId} />

            <div className='ProfilePage'>
                <Sidebar {...prop} />
                <div className='Profile'>
                    <p className='Profile--header'>User Profile</p>
                    <hr className='Profile--hr' />
                    <div className='Profile--details'>
                        <table>
                            <tr>
                                <th className='Table--username'>Username</th>
                                <td>{userData.username}</td>
                            </tr>
                            <tr>
                                <th className='Table--email'>Email</th>
                                <td>{userData.email}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;