import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Sidebar = (props: any) => {
    const navigate = useNavigate();
    // const {id}: any = useParams();
    const prop = props;
    const id = prop;
    // console.log(props)
    // const id = props.map((p: any) => {
    //     return p;
    // })

    console.log(props);
    console.log("Sidebar id: " + id[Object.keys(id)[0]]);

    return (
        <div className='Sidebar'>
            <button
                className='Sidebar--home'
                onClick={() => navigate(`/home/${id[Object.keys(id)[0]]}`)}
            >Home</button>
        </div>
    )
}

export default Sidebar;