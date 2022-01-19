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

        <form onSubmit={handleDeleteSubmit}>
        <div className="deleteContainer">
          <div className="deleteTitle">Select date to delete</div>
          <LocalizationProvider   dateAdapter={AdapterDateFns}>
            <DatePicker  value = {deleteDate} onChange={handleDeleteDateChange} renderInput={(params) => <TextField  {...params} />}/>
        </LocalizationProvider> 
        <button type="submit">  Delete </button> 
        </div> 
        </form>
        
    
  )
}

export default Delete

