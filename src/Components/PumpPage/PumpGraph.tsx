import { type } from 'os';
import React, {useEffect, useState, useContext} from 'react';
// import * as Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
import centriPump from '../../Assets/Images/centrifugal-pump.png';
import jetPump from '../../Assets/Images/jet-pump.png';
import pistonPump from '../../Assets/Images/piston-pump.png'; 
import axios from 'axios';
import PumpApplication from './PumpApplications';
import timeSeriesJson from './TimeSeriesJson';
import { UserContext } from '../UserLogin/Login';

// const baseURL2 = `http://localhost:5148/api/Pump`;

const PumpGraph: React.FC = (props:any) => {

    const [pumpData, setPumpData]: any[] = useState([]);
    const [pumpForecast, setPumpForecast]: any[] = useState([]);
    // const [pumpDef, setPumpDef]: any = useState("");
    const sentData = props;
    let jsonGetId = sentData[0];
    // console.log(sentData[0]);
    const timeSeriesData = timeSeriesJson;
    
    if(Object.keys(sentData).length > 1) {
        
        jsonGetId = sentData[0] + sentData[1];
    }else {
        
        jsonGetId = sentData[0];
    }
    useEffect(() => {
        axios.get(`http://localhost:5148/api/JsonData/${jsonGetId}`)
        .then((res) => {
            setPumpForecast(res.data);
        })
    }, []);
    console.log(pumpForecast);
    let forecastDate: any[] = pumpForecast.map((p:any) => {
        return p.date;
    });
    // console.log(forecastDate);
    let forecastVal1: any[] = pumpForecast.map((p:any) => {
        return p.value1;
    });
    // console.log(forecastVal1);
    let forecastVal2: any[] = pumpForecast.map((p:any) => {
        return p.value2;
    });
    // console.log(forecastVal2);
    // console.log("Json data2: " + JSON.stringify(sentData));
    
    const data = [
        {
        x: forecastDate,  
        y: forecastVal1,
          type: 'scatter',
          name: 'Flow Rate',
          marker: {color: 'green'}
        },
        {
            x: forecastDate,
            y: forecastVal2,
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
                            height: 300,
                            width: 1300, 
                            title: "Pump Graph",
                            yaxis: {
                                title: "Forecast"
                            },
                        }
                    }
                    config={{displayModeBar: false}}
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