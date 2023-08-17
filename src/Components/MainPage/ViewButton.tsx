import React, { useEffect, useState } from 'react';
import viewBtn from "../../Assets/Images/eye.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const baseURL2 = `http://localhost:5148/api/Pump`;
const baseURL = `http://localhost:5148/api/User`;

const ViewButton: React.FC = (props: any) => {
    const navigate = useNavigate();
    const [userData, setUserData]: any[] = useState([]);
    const [pumpData, setPumpData]: any[] = useState([]);
    const propsData = props;


    useEffect(() => {
        axios.get(baseURL)
            .then((res) => {
                setUserData(res.data);
            })
    }, [])
    useEffect(() => {
        axios.get(baseURL2)
            .then((res) => {
                setPumpData(res.data);
            })
    }, [])
    const id = props.data.userId;


    function handleViewClick() {
        // navigate(`/pump/${pump.data.pumpId}`, { state: propsData[0] });
        // console.log("View clicked: " + props.data.pumpId)
        // console.log(userData)
        // console.log("PropsData: " + props.data)
        // console.log("UserId: " + id);
        // console.log((propsData));
        navigate(`/pump/${props.data.pumpId}`, { state: { id } })
    }
    return (
        <span title='Show Info'><img src={viewBtn} className='viewBtn' onClick={handleViewClick} /></span>
    )
}

export default ViewButton;