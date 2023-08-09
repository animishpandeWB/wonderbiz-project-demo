import React from 'react';
import mainLogo from '../Assets/Images/wonderbiz-logo.jpg';
import userLogo from '../Assets/Images/user.png';
import companyLogo from '../Assets/Images/company-logo.jpg';
import userProfile from '../Assets/Images/user-profile.png';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';


const NavBar: React.FC<{loginPageBool: boolean, mainId: any}> = ({loginPageBool, mainId}) => {
    function dropDown() {
        // console.log(mainId);
        return (
            <NavDropdown title = {<button className='Navbar--user'><img src={userProfile} className='userProfile'/>Admin</button>} id='basic-nav-dropdown'>
                <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                <NavDropdown.Item href={`/profile/${mainId}`}>Profile</NavDropdown.Item>
            </NavDropdown>
        )
    }

    return (
        <div className='navBar d-flex mb-2'>
            <Link to={!loginPageBool ? `/home/${mainId}` : "/login"}>
                <img src={companyLogo} alt="mainLogo" className='Navbar--mainLogo navbar-brand p2' />
            </Link>
            <p className='companyName'>StreamFlow Pumps</p>
            {!loginPageBool && <div className='ms-auto p2'>{dropDown()}</div>}
            
        </div>
    )
}

export default NavBar;