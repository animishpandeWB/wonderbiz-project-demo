import React, { useState } from 'react';
// import mainLogo from '../Assets/Images/wonderbiz-logo.jpg';
import userLogo from '../Assets/Images/user.png';
import SearchButton from '../Assets/Images/icons8-search-50.png';
import companyLogo from '../Assets/Images/company-logo-removebg-preview.png';
import userProfile from '../Assets/Images/icons8-male-user-50.png';
import { Link } from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const NavBar: React.FC<{ loginPageBool: boolean, mainId: any }> = ({ loginPageBool, mainId }) => {
    const navigate = useNavigate();
    function dropDown() {
        // console.log(mainId);
        return (

            <NavDropdown title={<button className='Navbar--user'><img src={userProfile} className='userProfile' />Admin</button>} id='basic-nav-dropdown'>
                <NavDropdown.Item href={`/profile/${mainId}`}>Profile</NavDropdown.Item>
                <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }

    return (
        <div className='MainNavbar'>
            <div>
                <div className='navBar d-flex'>
                    <Link to={!loginPageBool ? `/home/${mainId}` : "/login"}>
                        <img src={companyLogo} alt="mainLogo" className='Navbar--mainLogo navbar-brand p2' />
                    </Link>
                    <p className='companyName'>StreamFlow Pumps</p>
                    {!loginPageBool && <div className='ms-auto p2'>{dropDown()}</div>}
                </div>
            </div>
        </div>
    )
}

export default NavBar;