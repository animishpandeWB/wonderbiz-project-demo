import React, { useState, useRef, useMemo, useEffect, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import PumpStatusButton from './PumpStatusButton';
import PumpIndex from './PumpIndex';
import ViewButton from './ViewButton';
import deleteBtn from '../../Assets/Images/icons8-delete-50.png';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';
import SearchButton from '../../Assets/Images/icons8-search-50.png';
import './pumpTable.css';
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
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { GridApi } from 'ag-grid-community';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


// const api = axios.create({
//     baseURL: `http://localhost:5148/`
// })
const UserURL = `http://localhost:5148/api/User`;
const PumpURL = `http://localhost:5148/api/Pump/Users`;
const baseURL2 = `http://localhost:5148/api/Pump`;
const baseURL3 = `http://localhost:3000/pump`;

// interface PumpData {
//     id: number
//     pumpName: string
//     pumpType: string
//     pumpStatus: boolean
// }

const PumpTable: React.FC = (props: any) => {

    const [searchInput, setSearchInput] = useState("");
    const [pumpNum, setPumpNum]: any[] = useState([]);
    const [apiData, setApiData]: any[] = useState([]);
    const [pumpsData, setPumpsData]: any[] = useState([]);
    const [filterSearch, setFilterSearch]: any[] = useState(pumpsData);
    const [openDialog, setOpenDialog] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputType, setInputType] = useState("");
    const [statusValue, setStatusValue] = React.useState("false");
    const [pumpTypeSelect, setPumpTypeSelect] = React.useState("");
    const [seed, setSeed]: any = useState(1);
    const [gridApi, setGridApi]: any = useState(null);
    const [refreshCounter, setRefreshCounter]: any = useState(1);

    const [columnData, setColumnData]: any[] = useState([
        // {field: "pumpId", headerName: "Pump ID", headerClass: 'pumpStyle'},
        {
            field: "name",
            headerName: "Pump Name",
            headerClass: 'pumpStyle',
            flex: 1,
            rowClass: 'pumpRowStyle',
            cellStyle: () => ({
                fontSize: '16px'
            })
            // sortingOrder: ["desc"]
            // sort: 'desc'
        },
        {
            field: "type",
            headerName: "Pump Type",
            headerClass: 'pumpStyle',
            flex: 1,
            cellStyle: () => ({
                fontSize: '16px'
            })
            // sort: 'desc'
        },
        {
            field: "status",
            headerName: "Pump Status",
            cellRenderer: PumpStatusButton,
            headerClass: 'pumpStyle',
            width: 150,
            cellStyle: () => ({
                textAlign: "center"
            })
            // sort: 'desc'
        },
        {
            field: "view",
            headerName: "View Pump",
            cellRenderer: ViewButton,
            headerClass: 'pumpStyle',
            width: 150,
            cellStyle: () => ({
                textAlign: "center"
            })
            // sort: 'desc'
        },
        {
            field: "delete",
            headerName: "Delete Pump",
            cellRenderer: DeleteButton,
            cellRendererParams: {
                setRefreshCounter: setRefreshCounter
            },
            suppressNavigable: true,
            headerClass: 'pumpStyle',
            width: 150,
            cellStyle: () => ({
                textAlign: "center"
            })
            // sort: 'desc'
        }
    ]);
    const navigate = useNavigate();

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: false,
        // filter: true,
        // flex: 1,
    }), []);
    const handleDelete = (pump: any) => {
        console.log(pump.value);
    }
    // const pumpIndex = PumpIndex;
    // console.log(pumpIndex);


    const gridRef: any = useRef();
    const propsData = props;
    // console.log(propsData[0]);
    const loginId = propsData[0];
    // console.log(loginId);
    // const gridApi: any = GridApi;
    const onGridReady = (params: any) => {
        setGridApi(params.api);
    };

    const refreshGrid = () => {
        if (gridApi) {
            gridApi.refreshCells();
        }
    };


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
        axios.get(`http://localhost:5148/api/Pump`)
            .then((res) => {
                setPumpNum(res.data);
            })
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:5148/api/Pump/Users/${propsData[0]}`)
            .then((res) => {
                setPumpsData(res.data);
            })
    }, [refreshCounter]);


    // console.log(`Pumpsdata: ${JSON.stringify(pumpsData.map((p:any) => p.pumpId))}`);
    useEffect(() => {
        setFilterSearch(pumpsData);
    }, [pumpsData]);
    let pumpId = 0;
    pumpNum.map((pump: any) => {
        pumpId = pump.pumpId;
    })
    // console.log(pumpsData);
    // console.log("PumpId: " + pumpId);
    // const usingContextData = useContext(UserContext);
    // console.log("Using context data: " + usingContextData);

    const handleChange = (e: HTMLInputElement): void => {
        setSearchInput(e.value);
    };
    function handleSearch() {
        pumpsData.map((pump: any) => {
            if (pump.name == searchInput) {
                console.log(pump.name + " found");
                setFilterSearch([pump]);
                return;
            } else {
                // window.location.reload();
                // gridApi.refreshCells();
            }
        })
    }

    // console.log("PropsData[0] + " + propsData[0]);
    function cellClickedListener(pump: any) {
        navigate(`/pump/${pump.data.pumpId}`, { state: propsData[0] });
    }

    function handleAdd() {
        // console.log("Add clicked");
        setOpenDialog(true);
    }
    function handleClose() {
        setOpenDialog(false);
    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusValue(event.target.value);
    };
    const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("Input name changed");
        setInputName(event.target.value);
    }
    // const handleInputTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log("Input type changed");
    //     setInputType(event.target.value);
    // }
    function handleSubmit() {
        const statusVal = (statusValue === 'true')
        if (!inputName && !pumpTypeSelect) {
            alert("Add Pump Details")
            handleClose();
        } else {
            const payload = {
                "pumpId": (pumpId + 1),
                "name": inputName,
                "type": pumpTypeSelect,
                "status": statusVal,
                "userId": loginId,
                "user": null
            }
            axios.post("http://localhost:5148/api/Pump", payload)
                .then((response) => {
                    console.log(response.data);
                })
            toast.success("Pump Added!");
            handleClose();
            setRefreshCounter(refreshCounter + 1);
            // window.location.reload();
            // setSeed(Math.random());
            // refreshGrid();
        }
    }

    const handlePumpTypeChange = (event: any) => {
        setPumpTypeSelect(event.target.value);
        console.log(event.target.value);
    }
    return (
        <div className='PumpTable'>
            <ToastContainer 
                autoClose={3000}
            />
            <div className='PumpTable--search'>
                <button className='PumpTable--addPump' onClick={handleAdd}>Add Pump</button>
                <div>
                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>Add Pump</DialogTitle>
                        <DialogContent>
                            <TextField
                                required
                                color='success'
                                margin="dense"
                                id="name"
                                label="Pump Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleInputNameChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel color='success' id="demo-simple-select-label">Pump Type</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pumpTypeSelect}
                                    label="Pump Type"
                                    onChange={handlePumpTypeChange}
                                    color='success'
                                >
                                    <MenuItem value={"Centrifugal Pump"}>Centrifugal Pump</MenuItem>
                                    <MenuItem value={"Jet Pump"}>Jet Pump</MenuItem>
                                    <MenuItem value={"Piston Pump"}>Piston Pump</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel color='success' id="demo-controlled-radio-buttons-group">Pump Status</FormLabel>
                                <RadioGroup
                                    color='success'
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={statusValue}
                                    onChange={handleStatusChange}
                                >
                                    <FormControlLabel value="true" color='success' control={<Radio color='success' />} label="Running" />
                                    <FormControlLabel value="false" color='success' control={<Radio color='success' />} label="Stopped" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color='success'>Cancel</Button>
                            <Button onClick={handleSubmit} color='success'>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='SearchBar'>
                    <input
                        type='text'
                        className='PumpTable--searchbar'
                        placeholder='Search here'
                        onChange={(e) => handleChange(e.target)}
                        value={searchInput}
                    />
                    <button onClick={handleSearch}><img src={SearchButton} className='searchBtn' /></button>
                </div>

            </div>

            <div className="ag-theme-alpine">

                <AgGridReact
                    key={seed}
                    ref={gridRef}
                    rowData={filterSearch}

                    columnDefs={columnData}
                    defaultColDef={defaultColDef}

                    animateRows={true}
                    rowSelection='single'
                    rowClass={'pumpRowStyle'}
                    rowHeight={50.5}
                    onGridReady={onGridReady}

                    // onCellClicked={(cellClickedListener)}
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