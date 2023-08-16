import React, { useState } from 'react';
// import mainLogo from '../Assets/Images/wonderbiz-logo.jpg';
import userLogo from '../Assets/Images/user.png';
import SearchButton from '../Assets/Images/icons8-search-50.png';
import companyLogo from '../Assets/Images/company-logo.jpg';
import userProfile from '../Assets/Images/user-profile.png';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
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
    const [searchInput, setSearchInput] = useState("");
    const [openDialog, setOpenDialog]: any = useState(false);
    const [pumpTypeSelect, setPumpTypeSelect] = React.useState("");
    const [statusValue, setStatusValue] = React.useState("false");

    function handleClose() {
        setOpenDialog(false);
    }
    function handleInputNameChange() {

    }
    function handlePumpTypeChange() {

    }
    function handleStatusChange() {

    }
    function handleSubmit() {

    }
    const handleChange = (e: HTMLInputElement): void => {
        setSearchInput(e.value);
    };
    function handleSearch() {

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
            {/* <div className='MainNavbar--bottom'>
                <button
                    className='Sidebar--home'
                    onClick={() => navigate(`/home/${mainId}`)}
                >Home</button>
                <div>
                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>Add Pump</DialogTitle>
                        <DialogContent>
                            <TextField
                                color='success'
                                margin="dense"
                                id="name"
                                label="Pump Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleInputNameChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel color='success' id="demo-simple-select-label">Pump Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pumpTypeSelect}
                                    label="Pump Type"
                                    onChange={handlePumpTypeChange}
                                    color='success'
                                >
                                    <MenuItem value={"Centrifugal Pump"}>Centrifugal Pump</MenuItem>
                                    <MenuItem value={"Jet Pump"}>Jet Pump</MenuItem>
                                    <MenuItem value={"Piston Pump"}>Piston Pump</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel color='success' id="demo-controlled-radio-buttons-group">Pump Status</FormLabel>
                                <RadioGroup
                                    color='success'
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={statusValue}
                                    onChange={handleStatusChange}
                                >
                                    <FormControlLabel value="true" color='success' control={<Radio color='success' />} label="On" />
                                    <FormControlLabel value="false" color='success' control={<Radio color='success' />} label="Off" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color='success'>Cancel</Button>
                            <Button onClick={handleSubmit} color='success'>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='SearchBar'>
                    <input
                        type='text'
                        className='PumpTable--searchbar'
                        placeholder='Search here'
                        onChange={(e) => handleChange(e.target)}
                        value={searchInput}
                    />
                    <button onClick={handleSearch}><img src={SearchButton} className='searchBtn' /></button>
                </div>
            </div> */}
        </div>
    )
}

export default NavBar;