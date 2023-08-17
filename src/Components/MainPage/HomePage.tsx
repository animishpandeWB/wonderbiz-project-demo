import React from 'react';
import Navbar from '../Navbar';
// import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { Link, useParams } from 'react-router-dom';
import PumpTable from './PumpTable';
import Sidebar from './Sidebar';


const HomePage = (match: any) => {
    const loginPageBool = false;
    const { id }: any = useParams();
    const homePageToggle: any = true;
    let prop = {
        id: id,
        homePageToggle: homePageToggle
    }
    return (
        <div>
            <Navbar loginPageBool={loginPageBool} mainId={id} />
            <div className='HomePage'>
                <Sidebar {...prop} />
                <PumpTable {...id} />
            </div>
        </div>
    )
}

export default HomePage;