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


const Delete = ({handleDeleteDateChange,handleDeleteSubmit,deleteDate, openDeleteDia,  handleClickOpen, handleClose}) => {
  return(
    <div className="deleteContainer">
      <div>Select date to delete</div>
      <LocalizationProvider   dateAdapter={AdapterDateFns}>
        <DatePicker  value = {deleteDate} onChange={handleDeleteDateChange} renderInput={(params) => <TextField  {...params} />}/>
      </LocalizationProvider> 
      <Button variant = "outlined" onClick={handleClickOpen}>
        Delete data for {deleteDate}
      </Button>
      <Dialog open ={openDeleteDia} onClose={handleClose} aria-describedby="alert-dialog-description"> 
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you wish to delete data for {deleteDate}
        </DialogContentText>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteSubmit} autoFocus> Agree </Button>
        </DialogActions>
        </Dialog>
      </div> 
  )
}
export default Delete

