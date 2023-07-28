import React from 'react';
import mainLogo from '../Assets/Images/wonderbiz-logo.jpg';
import userLogo from '../Assets/Images/user.png';
import { Link } from 'react-router-dom';


const Navbar: React.FC<{loginPageBool: boolean}> = ({loginPageBool}) => {
    return (
        <div className='Navbar'>
            <Link to={"/home"}><img src={mainLogo} alt="mainLogo" className='Navbar--mainLogo' /></Link>
            {!loginPageBool && <img src={userLogo} alt="userLogo" className='Navbar--userLogo'/>}
        </div>
    )
}

export default Navbar;