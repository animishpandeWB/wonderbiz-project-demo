import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddButton = (props: any) => {
    const [open, setOpen] = useState(props.openDia);
    console.log(props.openDia);

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Pump</DialogTitle>
            </Dialog>
        </div>
    )
}

export default AddButton;