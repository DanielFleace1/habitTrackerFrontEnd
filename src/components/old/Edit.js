
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


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const Edit = ({deleteDate,handleDeleteDateChange}) => {
  
  return(
    <div >
      <div className="deleteContainer">
      <div className="deleteTitle">Select date to edit</div>
      <LocalizationProvider   dateAdapter={AdapterDateFns}>
        <DatePicker  value = {deleteDate} onChange={handleDeleteDateChange} renderInput={(params) => <TextField  {...params} />}/>
      </LocalizationProvider> 
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select field to edit</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    label="Select Edit Field"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>

      {/* <Button variant = "outlined" onClick={handleClickOpen}>
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
        </Dialog> */}
      </div> 
    </div>
  )
}

export default Edit

        {/* <LocalizationProvider   dateAdapter={AdapterDateFns}>
            <DatePicker  label="Select Date to edit or delete values:" onChange={()=>{console.log('change');}} renderInput={(params) => <TextField  {...params} />}/>
        </LocalizationProvider> */}
