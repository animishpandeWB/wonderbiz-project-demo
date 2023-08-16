import React from 'react';
import NavBar from '../Navbar';
import PumpGraph from './PumpGraph';
import Sidebar from '../MainPage/Sidebar';
import './detail.css';
import { useParams, useLocation } from 'react-router-dom';
import { match } from 'assert';

const PumpDetail: React.FC = (match: any) => {
    const loginPageBool = false;
    // console.log(props);
    const { id }: any = useParams();
    const loginId: any = useLocation();
    const mainId = loginId.state;
    // console.log(mainId);
    return (
        <div>
            <NavBar loginPageBool={loginPageBool} mainId={mainId} />

            <div className='PumpDetail'>
                <Sidebar {...mainId} />
                <PumpGraph {...id} />
            </div>
        </div>

    );
}

export default PumpDetail;