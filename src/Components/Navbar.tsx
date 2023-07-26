import React from 'react';
import mainLogo from '../Assets/Images/wonderbiz-logo.jpg';
import userLogo from '../Assets/Images/user.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <div className='Navbar'>
            <Link to={"/"}><img src={mainLogo} alt="mainLogo" className='Navbar--mainLogo' /></Link>
            <img src={userLogo} alt="userLogo" className='Navbar--userLogo'/>
        </div>
    )
}

export default Navbar;