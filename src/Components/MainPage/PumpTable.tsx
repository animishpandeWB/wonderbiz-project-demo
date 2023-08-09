import React, {useState, useRef, useMemo, useEffect, useContext} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import PumpStatusButton from './PumpStatusButton';
import ViewButton from './ViewButton';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';
import SearchButton from '../../Assets/Images/magnifying-glass.png';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


// const api = axios.create({
//     baseURL: `http://localhost:5148/`
// })
const UserURL = `http://localhost:5148/api/User`;
const PumpURL = `http://localhost:5148/api/Pump/Users`;
const baseURL3 = `http://localhost:3000/pump`;

// interface PumpData {
//     id: number
//     pumpName: string
//     pumpType: string
//     pumpStatus: boolean
// }

const PumpTable: React.FC = (props:any) => {

    const [searchInput, setSearchInput] = useState("");
    const [apiData, setApiData]: any[] = useState([]);
    const [pumpsData, setPumpsData]: any[] = useState([]);
    const [filterSearch, setFilterSearch]: any[] = useState(pumpsData);
    const [openDialog, setOpenDialog] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputType, setInputType] = useState("");
    const [statusValue, setStatusValue] = React.useState("false");
    const [columnData, setColumnData]: any[] = useState([
        {field: "pumpId", headerName: "Pump ID"},
        {field: "name", headerName: "Pump Name"},
        {field: "type", headerName: "Pump Type"},
        {field: "status", headerName: "Pump Status", cellRenderer: PumpStatusButton},
        {field: "view", headerName: "View Pump", cellRenderer: ViewButton},
        {field: "delete", headerName: "Delete Pump", cellRenderer: DeleteButton, suppressNavigable: true}
    ]);
    const navigate = useNavigate();

    const defaultColDef = useMemo( ()=> ({
        sortable: true,
        resizable: true,
        // filter: true,
        flex: 1,
      }), []);
    
    const gridRef: any = useRef();
    const propsData = props;
    // console.log(propsData[0]);
    const loginId = propsData[0];
    console.log(loginId);

    
    useEffect(() => {
        axios.get(UserURL)
        .then((res) => {
            setApiData(res.data);  
        })
    }, []);
    // console.log(apiData);
    useEffect(() => {
        axios.get(`http://localhost:5148/api/Pump/Users/${propsData[0]}`)
        .then((res) => {
            setPumpsData(res.data);
        })
    }, []);
    useEffect(() => {
        setFilterSearch(pumpsData);
    }, [pumpsData]);
    // const usingContextData = useContext(UserContext);
    // console.log("Using context data: " + usingContextData);
    
    const handleChange = (e: HTMLInputElement): void => {
        setSearchInput(e.value);
    };
    
    function handleSearch() {
        pumpsData.map((pump: any) => {
            if(pump.name == searchInput) {
                console.log(pump.name + " found");
                setFilterSearch([pump]);
                return;
            }else {
                // window.location.reload();
            }
        })
    }

    function cellClickedListener(pump: any) {
        navigate(`/pump/${pump.data.pumpId}`, {state: propsData[0]});
    }

    function handleAdd() {
        console.log("Add clicked");
        setOpenDialog(true);
    }
    function handleClose() {
        setOpenDialog(false);
    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusValue(event.target.value);
    };
    const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Input name changed");
        setInputName(event.target.value);
    }
    const handleInputTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Input type changed");
        setInputType(event.target.value);
    }
    function handleSubmit() {
        const statusVal = (statusValue === 'true')
        const payload = {
            "id": 0,
            "name": inputName,
            "type": inputType,
            "status": statusVal,
            "userId": loginId,
            "user": null
        }
        axios.post("http://localhost:5148/api/Pump", payload)
                .then((response) => {
                    console.log(response.data);
                })
        window.location.reload();
    }
    return (
        <div className='PumpTable'>
            <div className='PumpTable--search'>
                <button className='PumpTable--addPump' onClick={handleAdd}>Add Pump</button>
                <div>
                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>Add Pump</DialogTitle>
                        <DialogContent>
                            <TextField
                                color='success'
                                margin="dense"
                                id="name"
                                label="Pump Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleInputNameChange}
                            />
                            <TextField
                                color='success'
                                margin="dense"
                                id="type"
                                label="Pump Type"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleInputTypeChange}
                            />
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Pump Status</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={statusValue}
                                    onChange={handleStatusChange}
                                >
                                <FormControlLabel value="true" control={<Radio />} label="On" />
                                <FormControlLabel value="false" control={<Radio />} label="Off" />
                                </RadioGroup>
                            </FormControl>
                            
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color='success'>Cancel</Button>
                            <Button onClick={handleSubmit} color='success'>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <input 
                    type='text'
                    className='PumpTable--searchbar'
                    placeholder='Search here'
                    onChange={(e) => handleChange(e.target)}
                    value={searchInput}
                />
                <button onClick={handleSearch}><img src={SearchButton} className='searchBtn'/></button>
            </div>
            
            <div className="ag-theme-alpine">

                <AgGridReact
                    ref={gridRef}
                    rowData={filterSearch}

                    columnDefs={columnData}
                    defaultColDef={defaultColDef} 

                    animateRows={true} 
                    rowSelection='single' 

                    onCellClicked={(cellClickedListener)} 
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