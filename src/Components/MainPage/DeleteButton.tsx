import React, { useEffect, useState } from 'react';
import deleteBtn from '../../Assets/Images/icons8-delete-50.png';
import editBtn from '../../Assets/Images/icons8-edit-24.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const baseURL2 = `http://localhost:5148/api/Pump`;
const baseURL = `http://localhost:5148/api/User`;
const delay = (ms: number | undefined) => new Promise(
    resolve => setTimeout(resolve, ms)
);
const DeleteButton: React.FC = (props: any) => {
    const navigate = useNavigate();
    const [userData, setUserData]: any[] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [pumpTypeSelect, setPumpTypeSelect] = React.useState("");
    const [statusValue, setStatusValue] = React.useState("false");
    const [inputName, setInputName] = React.useState("false");
    // const [refreshCounter, setRefreshCounter]: any = useState(1);


    useEffect(() => {
        axios.get(baseURL)
            .then((res) => {
                setUserData(res.data);
            })
    }, [])

    // console.log(props.data)
    // function timeout(delay: number) {
    //     new Promise(res => setTimeout(res, delay));
    //     window.location.reload();
    // }
    const handleDelay = async (event: any) => {
        await delay(5000);
        console.log("handle delay click")
        window.location.reload();
    }
    function handleDelete() {
        console.log(props.data.pumpId)
        axios.delete(`${baseURL2}/${props.data.pumpId}`)
            .then(() => toast.success("Pump Deleted!"))
            .catch((error) => toast.error(error.data))
            .finally(() => props.setRefreshCounter((prevCount: any) => prevCount + 1))
            // .finally(() => window.location.reload());


        return;
        // console.log(props.data.pumpId)
        // console.log(userData[0].userId)
    }

    var pumpId = props.data.pumpId;
    var pumpName = props.data.name;
    var pumpTypeVal = props.data.type;
    var pumpStatusVal = props.data.status;
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
    const handlePumpTypeChange = (event: any) => {
        setPumpTypeSelect(event.target.value);
        console.log(event.target.value);
    }
    function handleEdit() {
        setOpenDialog(true);
        console.log(props.data);
    }
    const handleSubmit = (event: any) => {
        console.log("Edit form submit");
        console.log(pumpTypeSelect + " " + inputName + " " + statusValue);
        var payload = {
            "id": props.data.id,
            "pumpId": props.data.pumpId,
            "name": inputName,
            "type": pumpTypeSelect,
            "status": statusValue,
            "userId": props.data.userId,
            "user": null
        }
        axios.put("http://localhost:5148/api/Pump", payload)
        .then((response) => console.log(response.data))
        // .then(() => toast.success("Pump Updated!"))
        //     .catch((error) => toast.error(error.data))
        //     .finally(() => window.location.reload());
    }
    return (
        <div>
            <span><img src={deleteBtn} className='viewBtn' onClick={handleDelete} /></span>
            <span><img src={editBtn} className='viewBtn' onClick={handleEdit} /></span>
            <div>
                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>Edit Pump</DialogTitle>
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
                                defaultValue={pumpName}
                                placeholder={pumpName}
                                onChange={handleInputNameChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel color='success' id="demo-simple-select-label">Pump Type</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={pumpTypeVal}
                                    // placeholder={pumpTypeVal}
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
                                    defaultValue={pumpStatusVal}
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
            {/* <ToastContainer /> */}
        </div>
    );
}

export default DeleteButton;