import React from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

const Title = ({date,handleDateChange}) => {
  return(
    <div className="TitleC">
        <div  className="titleText"> Habit Tracker App </div>
        <div className="datePicker">
            <LocalizationProvider   dateAdapter={AdapterDateFns}>
              <DatePicker  label="Enter Data for:" value={date} onChange={handleDateChange} renderInput={(params) => <TextField  {...params} />}/>
            </LocalizationProvider>
        </div>
    </div>
  )
}

export default Title

{/* <input onChange={Handlers} value={state}   className = "InputC" /> */}