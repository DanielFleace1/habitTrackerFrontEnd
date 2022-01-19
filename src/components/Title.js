import React from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Title = ({date,handleDateChange,submissionAlert}) => {
  if(submissionAlert !== null){
    return(
      <div className="TitleC">
        <div  className="titleText"> Habit Tracker App </div>
        <div className="subDatePicker">   
          <Stack sx={{height: '120', width:'36%' }} spacing={2}>
            <Alert sx={{height: '120%' }} severity={submissionAlert}> Your submission for {date} was successful!</Alert>
          </Stack>
          <LocalizationProvider   dateAdapter={AdapterDateFns}>
            <DatePicker  label="Enter Data for:" value={date} onChange={handleDateChange} renderInput={(params) => <TextField  {...params} />}/>
          </LocalizationProvider>
        </div>
      </div> 
    )
  }
  else {
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


}

export default Title

{/* <input onChange={Handlers} value={state}   className = "InputC" /> */}