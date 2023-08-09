import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Sidebar = (props:any) => {
    const navigate = useNavigate();
    // const {id}: any = useParams();
    const id = props;
    // console.log(id[0]);

    return (
        <div className='Sidebar'>
            <button 
                className='Sidebar--home'
                onClick={() => navigate(`/home/${id[0]}`)}
                >Home</button>
        </div>
    )
}

export default Sidebar;