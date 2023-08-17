import React from 'react';
import NavBar from '../Navbar';
import PumpGraph from './PumpGraph';
import Sidebar from '../MainPage/Sidebar';
import './detail.css';
import { useParams, useLocation } from 'react-router-dom';
import { match } from 'assert';

const PumpDetail: React.FC = (props: any) => {
    const loginPageBool = false;
    // console.log(props);
    // const prop = props;
    const { id }: any = useParams();
    const loginId: any = useLocation();
    const mainId = loginId.state;
    let homePageToggle = false;
    let prop = {
        mainId: mainId.id,
        homePageToggle: homePageToggle
    }
    // console.log(mainId);
    // console.log(loginId);
    // console.log(prop);
    return (
        <div>
            <NavBar loginPageBool={loginPageBool} mainId={mainId.id} />

            <div className='PumpDetail'>
                <Sidebar {...prop} />
                <PumpGraph {...id} />
            </div>
        </div>

    );
}

export default PumpDetail;