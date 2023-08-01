import React from 'react';
import Navbar from '../Navbar';
// import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import PumpTable from './PumpTable';
import Sidebar from './Sidebar';


const HomePage = () => {
    const loginPageBool = false;
    return (
        <div>
            <Navbar loginPageBool = {loginPageBool} />
            <div className='HomePage'>
                {/* <Sidebar 
                    backgroundColor='#1DCED8'
                    width='200px'>
                    <Menu>
                        <MenuItem 
                            component={<Link to="/home"/>}
                        >Home</MenuItem>
                    </Menu>
                </Sidebar> */}
                <Sidebar />
                <PumpTable />
            </div>
        </div>
    )
}

export default HomePage;