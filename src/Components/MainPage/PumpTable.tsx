import React, {useState, useRef, useMemo, useEffect} from 'react';
import pumps from './PumpData';
import Table from 'react-bootstrap/esm/Table';
import viewButton from "../../Assets/Images/eye.png";
import onBtn from "../../Assets/Images/switch-on.png";
import offBtn from "../../Assets/Images/switch-off.png";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// interface PumpData {
//     id: number
//     pumpName: string
//     pumpType: string
//     pumpStatus: boolean
// }

const PumpTable = () => {

    const [searchInput, setSearchInput] = useState("");
    const [columnData, setColumnData]: any[] = useState([
        {field: "id"},
        {field: "pumpName"},
        {field: "pumpType"},
        {field: "pumpStatus"}
    ]);

    const defaultColDef = useMemo( ()=> ({
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
      }), []);
    // const pumps: PumpData[] = [
    //     {id: 1, pumpName: "Pump 1", pumpType: "Jet Pump", pumpStatus: true},
    //     {id: 2, pumpName: "Pump 2", pumpType: "Centrifugal Pump", pumpStatus: false},
    //     {id: 3, pumpName: "Pump 3", pumpType: "Piston Pump", pumpStatus: false},
    //     {id: 4, pumpName: "Pump 4", pumpType: "Jet Pump", pumpStatus: true},
    //     {id: 5, pumpName: "Pump 5", pumpType: "Centrifugal Pump", pumpStatus: true},
    //     {id: 6, pumpName: "Pump 6", pumpType: "Piston Pump", pumpStatus: false},
    //     {id: 7, pumpName: "Pump 7", pumpType: "Jet Pump", pumpStatus: true},
    //     {id: 8, pumpName: "Pump 8", pumpType: "Piston Pump", pumpStatus: true},
    //     {id: 9, pumpName: "Pump 9", pumpType: "Jet Pump", pumpStatus: false},
    //     {id: 10, pumpName: "Pump 10", pumpType: "Centrifugal Pump", pumpStatus: false}
    // ];

    const [pumpsData, setPumpsData] = useState(pumps);

    const handleChange = (e: HTMLInputElement): void => {
        // e.preventDefault();
        setSearchInput(e.value);
    };
    // console.log(pumpsData)
    
    // if(searchInput.length > 0) {
    //     pumpsData.filter((pump) => {
    //         getPump = pump.pumpName.match(searchInput);
    //         return getPump;
    //     });
    // }

    function handleClick(pump: Object) {
        console.log(pump);
    }

    function cellClickedListener(pump: any) {
        console.log(pump.data);
    }

    return (
        <div className='PumpTable'>
            <input 
                type='text'
                className='PumpTable--searchbar'
                placeholder='Search here'
                onChange={(e) => handleChange(e.target)}
                value={searchInput}
            />
            <div className="ag-theme-alpine">

                <AgGridReact

                    rowData={pumpsData} // Row Data for Rows

                    columnDefs={columnData} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties

                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows

                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                    pagination={true}
                    paginationPageSize={10}
                    />
            </div>
            
            {/* <Table striped bordered hover className='PumpTable--table'>
                <thead>
                    <tr className='table--row'>
                        <th>Pump ID</th>
                        <th>Pump Name</th>
                        <th>Pump Type</th>
                        <th>Pump Status</th>
                        <th>View Pump</th>
                    </tr>
                </thead>
                {
                    pumpsData.map((pump) => {
                        return (
                            <tbody>
                                <tr onClick={() => handleClick(pump)}>
                                    <td>{pump.id}</td>
                                    <td>{pump.pumpName}</td>
                                    <td>{pump.pumpType}</td>
                                    <td>{pump.pumpStatus ? <img src={onBtn} className='onBtn'/> : <img src={offBtn} className='offBtn'/>}</td>
                                    <td>{<button className='viewBtn'><img src={viewButton} className='viewBtn'/></button>}</td>
                                </tr>
                            </tbody>
                        
                    )})
                }
            </Table> */}
        
        </div>
    )
}

export default PumpTable;