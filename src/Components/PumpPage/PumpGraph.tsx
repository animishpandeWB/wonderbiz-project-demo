import { type } from 'os';
import React, {useEffect, useState, useContext} from 'react';
// import * as Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
import centriPump from '../../Assets/Images/centrifugal-pump.png';
import jetPump from '../../Assets/Images/jet-pump.jpg';
import pistonPump from '../../Assets/Images/piston-pump.png'; 
import axios from 'axios';
import PumpApplication from './PumpApplications';
import timeSeriesJson from './TimeSeriesJson';
import { UserContext } from '../UserLogin/Login';

// const baseURL2 = `http://localhost:5148/api/Pump`;

const PumpGraph: React.FC = (props:any) => {


    function findDataById(idToFind: any) {
        const foundObject = timeSeriesJson.find(item => item.id == idToFind);

        if(foundObject) {
            const { date1, values1, values2 } = foundObject;
            return {
                date1, values1, values2
            };
        }else {
            return null;
        }
    }

    const [pumpData, setPumpData]: any[] = useState([]);
    // const [pumpDef, setPumpDef]: any = useState("");
    const sentData = props;
    // console.log(sentData[0]);
    const timeSeriesData = timeSeriesJson;
    // console.log(timeSeriesData.data1)
    let d: any[] = [];
    let v: any[] = [];
    let z: any[] = [];
    let getJsonData: any;
    if(Object.keys(sentData).length > 1) {
        // console.log("Json data with 2 vals: " + sentData[0] + sentData[1]);
        getJsonData = findDataById(sentData[0] + sentData[1]);    
    }else {
        // console.log("Json data: " + sentData[0]);
        getJsonData = findDataById(sentData[0]);
    }
    
    // console.log("Json data2: " + JSON.stringify(sentData));
    if(getJsonData) {
        // console.log("Got data " + getJsonData.values1);
        d = getJsonData.date1;
        v = getJsonData.values1;
        z = getJsonData.values2;
    }else {
        console.log("No data found");
    }
    // const usingContextData = useContext(UserContext);
    // console.log("Using context data: " + usingContextData);
    // let dataArray: any[] = [];
    // for(let i = 0; i < timeSeriesData.length; i++) {
    //     dataArray.push(timeSeriesData[i]);
    //     console.log(dataArray);
    // }
    
    // if(sentData[0] == dataArray.every()) {
    //     d = timeSeriesData.data1.date1;
    //     v = timeSeriesData.data1.values1;
    //     z = timeSeriesData.data1.values2;
    // }else {
    //     d = timeSeriesData.data2.date1;
    //     v = timeSeriesData.data2.values1;
    //     z = timeSeriesData.data2.values2;
    // }
    
    // console.log("values: " + timeSeriesData.data2.values1.slice(0, 7)); 
    // console.log("d: " + d + " v:" + v + " z: " + z);
    // const d = timeSeriesData.data1.map((t) => {
    //     return t.date;
    // })
    // console.log(d);
    // const a = [];
    // const v = timeSeriesData.data1.map((t) => {
    //     // a.push(t.values);
    //     return t.values;
    // })
    // const z = timeSeriesData.data2.map((t) => {
    //     // a.push(t.values);
    //     return t.value;
    // })

    // function getRandomDate() {
    //     const maxDate = Date.now();
    //     const timestamp = Math.floor(Math.random() * maxDate);
    //     return new Date(timestamp);
    // }
    // let randomData: any[] = []; 
    // function randomDataPoints() {
    //     const randomNum = Math.floor(Math.random() * 100);
        
    //     return randomNum;
    // }
    
    // for(let i = 0; i < 7; i++) {
    //     randomData.push(randomDataPoints());
    // }
    
    // // console.log(getRandomDate());
    // var randomDateArray: any[] = [];
    // for(let i = 0; i < 7; i++) {
    //     randomDateArray.push(getRandomDate());
    // }
    // console.log(randomDateArray)
    // console.log(randomData)
    
    // const randomVal = [];
    // for(let i = 0; i < 7; i++) {
    //     randomVal.push(Math.floor(Math.random() * 51) + 100)
    // }
    // console.log(randomVal);
    const data = [
        {
        x: d,  
        y: v,
          type: 'scatter',
          name: 'Flow Rate',
          marker: {color: 'green'}
        },
        {
            x: d,
            y: z,
            name: 'Speed',
            type: 'scatter',
            marker: {color: 'orange'}
        }
    ];
    
    
    useEffect(() => {
        axios.get(`http://localhost:5148/api/Pump/${sentData[0]}`)
        .then((res) => {
            setPumpData(res.data);
        })
    }, []);  

    // console.log(pumpData);
    const pumpType = pumpData.type;
    const pumpName = pumpData.name;
    // console.log(pumpType);
    // console.log(pumpName);
    let pumpImage: any;
    if(pumpType == "Centrifugal Pump") {
        pumpImage = centriPump;
    }else if(pumpType == "Piston Pump") {
        pumpImage = pistonPump;
    }else {
        pumpImage = jetPump;
    }

    const pumpApp = PumpApplication;
    const pumpAppDef = pumpApp.map((p) => {
        return p.Definition;
    })
    // console.log(pumpAppDef)
    var pumpDef = "";
    if(pumpType == "Centrifugal Pump") {
        pumpDef = pumpAppDef[2];
    }else if(pumpType == "Piston Pump") {
        pumpDef = pumpAppDef[1];
    }else if(pumpType == "Jet Pump"){
        pumpDef = pumpAppDef[0];
    }
    // console.log(pumpDef)
    


    return (
        <div className='PumpGraph'>
            <div className='PumpGraph--graph'>
                <Plot
                    data={data}
                    layout={
                        {
                            width: 1300, 
                            title: "Pump Graph",
                            xaxis: {title: "Timestamp"},
                            yaxis: {
                                title: "Forecast"
                            }
                        }
                    }
                />
            </div>
            
            
            <div className='PumpGraph--bottomDetail'>
                <div className='PumpImg'>
                    <p className='PumpImg--heading'>Pump Image</p>
                    <img src={pumpImage} className='PumpImg--img'/>
                </div>
                <div className='PumpGraph--pumpInfo'>
                    <p className='PumpImg--heading'>Pump Details</p>
                    <div className='PumpGraph--pumpDetails'>
                        <p>Pump Name: {pumpName}</p>
                        <p>Pump Type: {pumpType}</p>
                        <p>Pump Detail:</p>
                        <p className='pumpDetailPara'>{pumpDef}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default PumpGraph;