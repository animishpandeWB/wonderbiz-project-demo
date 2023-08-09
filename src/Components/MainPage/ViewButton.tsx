import React from 'react';
import viewBtn from "../../Assets/Images/eye.png";

const ViewButton: React.FC = () => {
    return (
        <span><img src={viewBtn} className='viewBtn'/></span>
    )
}

export default ViewButton;