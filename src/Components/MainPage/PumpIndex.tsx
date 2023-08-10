import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PumpURL = `http://localhost:5148/api/Pump/Users`;
const PumpIndex: React.FC = (props: any) => {

    const [userIdData, setUserIdData]: any[] = useState([]);
    const data2 = props.data.userId; 
    console.log(data2);

    useEffect(() => {
        axios.get(`http://localhost:5148/api/Pump/Users`)
            .then((res) => {
                setUserIdData(res.data);
            })
    }, [])
    console.log(userIdData);

    return (
        <div>

        </div>
    )
}

export default PumpIndex;