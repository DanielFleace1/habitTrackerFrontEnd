import React, { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import  Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Resubmission = ({openResub,date,handleClose,handleResub}) => {
  return(
      <div>
      <Dialog open ={openResub} onClose={handleClose} aria-describedby="alert-dialog-description"> 
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Data for {date} has already been sumbitted. Click Agree to overwrite with new entry.
        </DialogContentText>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleResub} autoFocus> Agree </Button>
        </DialogActions>
        </Dialog>
      </div>
  )
}

export default Resubmission