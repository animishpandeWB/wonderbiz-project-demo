import React, { useEffect, useState } from 'react';
import deleteBtn from '../../Assets/Images/icons8-delete-50.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const baseURL2 = `http://localhost:5148/api/Pump`;
const baseURL = `http://localhost:5148/api/User`;
const delay = (ms: number | undefined) => new Promise(
    resolve => setTimeout(resolve, ms)
);
const DeleteButton: React.FC = (props: any) => {
    const navigate = useNavigate();
    const [userData, setUserData]: any[] = useState([]);

    useEffect(() => {
        axios.get(baseURL)
            .then((res) => {
                setUserData(res.data);
            })
    }, [])

    // function timeout(delay: number) {
    //     new Promise(res => setTimeout(res, delay));
    //     window.location.reload();
    // }
    const handleDelay = async (event: any) => {
        await delay(5000);
        console.log("handle delay click")
        window.location.reload();
    }
    function handleDelete() {
        console.log(props.data.pumpId)
        axios.delete(`${baseURL2}/${props.data.pumpId}`)
            .then(() => toast.success("Pump Deleted!"))
            .catch((error) => toast.error(error.data))
            .finally(() => window.location.reload());


        return;
        // console.log(props.data.pumpId)
        // console.log(userData[0].userId)
    }
    return (
        <div>
            <span><img src={deleteBtn} className='viewBtn' onClick={handleDelete} /></span>
            {/* <ToastContainer /> */}
        </div>
    );
}

export default DeleteButton;