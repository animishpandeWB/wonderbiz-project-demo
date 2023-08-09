import React, { useState, useEffect } from 'react';
import onBtn from "../../Assets/Images/icons8-green-dot-48.png";
import offBtn from "../../Assets/Images/icons8-red-dot-48.png";


const PumpStatusButton: React.FC = (props: any) => {    
    return (
        <span>{props.value ? <img src={onBtn} className='onBtn'/> : <img src={offBtn} className='offBtn'/>}</span>
    )
};

export default PumpStatusButton;