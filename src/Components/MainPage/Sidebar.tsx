import React from 'react';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className='Sidebar'>
            <button 
                className='Sidebar--home'
                onClick={() => navigate("/home")}
                >Home</button>
        </div>
    )
}

export default Sidebar;