import React, { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns'
import helpers from "../srcUtils/helperFns";
import App from "../App";
const clone = require('rfdc')()

const Delete = ({handleDeleteDateChange,handleDeleteSubmit,deleteDate}) => {

  return(
    <div >
        <form onSubmit={handleDeleteSubmit}>
        Select Date to Delete:    
        <LocalizationProvider   dateAdapter={AdapterDateFns}>
            <DatePicker  label="Select Date to edit or delete values:" value = {deleteDate} onChange={handleDeleteDateChange} renderInput={(params) => <TextField  {...params} />}/>
        </LocalizationProvider> 
        <button type="submit">  Delete </button> 
        </form>
    </div>
  )
}

export default Delete

