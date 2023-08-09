import React, {useEffect, useState} from 'react';
import deleteBtn from '../../Assets/Images/icons8-delete-48.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const baseURL2 = `http://localhost:5148/api/Pump`;
const baseURL = `http://localhost:5148/api/User`;
const DeleteButton: React.FC = (props: any) => {
    const navigate = useNavigate();
    const [userData, setUserData]: any[] = useState([]);

    useEffect(() => {
        axios.get(baseURL)
            .then((res) => {
                setUserData(res.data);
            })
    }, [])

    function handleDelete() {
        axios.delete(`${baseURL2}/${props.data.pumpId}`)
            .then(() => navigate(`/home/${userData[0].userId}`));
        console.log(props.data.pumpId)
    }
    return (
        <span><img src={deleteBtn} className='viewBtn' onClick={handleDelete}/></span>
    );
}

export default DeleteButton;