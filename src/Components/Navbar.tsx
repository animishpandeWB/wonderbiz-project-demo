import React from 'react';
import mainLogo from '../Assets/Images/wonderbiz-logo.jpg';
import userLogo from '../Assets/Images/user.png';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';


const NavBar: React.FC<{loginPageBool: boolean}> = ({loginPageBool}) => {
    function dropDown() {
        return (
            <NavDropdown title = {<img src={userLogo} alt="userLogo" className="Navbar--userLogo"/>} id='basic-nav-dropdown'>
                <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }

    return (
        <div className='navBar d-flex mb-2'>
            <Link to={"/home"}><img src={mainLogo} alt="mainLogo" className='Navbar--mainLogo navbar-brand p2' /></Link>
            {!loginPageBool && <div className='ms-auto p2'>{dropDown()}</div>}
            
        </div>
    )
}

export default NavBar;