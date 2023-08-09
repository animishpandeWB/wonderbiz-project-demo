import React from 'react';
import Navbar from '../Navbar';
// import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {Link, useParams} from 'react-router-dom';
import PumpTable from './PumpTable';
import Sidebar from './Sidebar';


const HomePage = (match: any) => {
    const loginPageBool = false;
    const {id}: any = useParams();
    return (
        <div>
            <Navbar loginPageBool = {loginPageBool} mainId = {id}/>
            <div className='HomePage'>
                <Sidebar {...id}/>
                <PumpTable {...id}/>
            </div>
        </div>
    )
}

export default HomePage;