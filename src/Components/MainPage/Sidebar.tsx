import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import homeImg from '../../Assets/Images/icons8-home-30.png';
import dashboardImg from '../../Assets/Images/icons8-pie-chart-50.png';
import taskImg from '../../Assets/Images/icons8-task-50.png';
import settingsImg from '../../Assets/Images/icons8-settings-50.png';


const Sidebar = (props: any) => {
    const navigate = useNavigate();
    // const {id}: any = useParams();
    const prop = props;
    const id = prop;
    const pageToggle = prop.homePageToggle;
    // console.log(props)
    // console.log(pageToggle)
    // const id = props.map((p: any) => {
    //     return p;
    // })

    // console.log(props);
    // console.log("Sidebar id: " + id[Object.keys(id)[0]]);

    return (
        <div className='Sidebar'>
            <button
                className={`${pageToggle ? "Sidebar--home" : "Sidebar--dashboard"}`}
                onClick={() => navigate(`/home/${id[Object.keys(id)[0]]}`)}>
                <img src={homeImg} className='home-img' />Home
            </button>
            <button
                className={`${pageToggle ? "Sidebar--dashboard" : "Sidebar--home"}`}
                onClick={() => navigate(`/home/${id[Object.keys(id)[0]]}`)}>
                <img src={dashboardImg} className='home-img' />Dashboard
            </button>
            <button
                className={"Sidebar--dashboard"}
                onClick={() => navigate(`/home/${id[Object.keys(id)[0]]}`)}>
                <img src={taskImg} className='home-img' />Tasks
            </button>
            <button
                className={"Sidebar--dashboard"}
                onClick={() => navigate(`/home/${id[Object.keys(id)[0]]}`)}>
                <img src={settingsImg} className='home-img' />Settings
            </button>

        </div>
    )
}

export default Sidebar;