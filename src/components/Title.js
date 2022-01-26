import React from "react";
import Login from "./Login";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



const Title = ({date,handleDateChange,submissionAlert,handleUserSubmit,handleUserChange,handlePassChange,username,password,user, handleLogout }) => {
   
   

  if(submissionAlert === 'success'){
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


  else if(submissionAlert === 'info'){
    return(
      <div className="TitleC">
        <div  className="titleText"> Habit Tracker App </div>
        <div className="subDatePicker">   
          <Stack sx={{height: '120', width:'36%' }} spacing={2}>
            <Alert sx={{height: '120%' }} severity={submissionAlert}> Form & Date Reset</Alert>
          </Stack>
          <LocalizationProvider   dateAdapter={AdapterDateFns}>
            <DatePicker  label="Enter Data for:" value={date} onChange={handleDateChange} renderInput={(params) => <TextField  {...params} />}/>
          </LocalizationProvider>
        </div>
      </div> 
    )
  }

  else if(submissionAlert === 'loginError'){
    return(
      <div className="TitleC">
        <div  className="titleText"> Habit Tracker App </div>
        <div className="subDatePicker">   
          <Stack sx={{height: '120', width:'36%' }} spacing={2}>
            <Alert sx={{height: '120%' }} severity={'error'}> Username or password incorrect</Alert>
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
          <div className="Login">
            <Login username={username} password={password} handleUserChange={handleUserChange} handlePassChange={handlePassChange} user = {user} handleLogout={handleLogout} handleUserSubmit={handleUserSubmit}
            
            />
          </div>
        </div>
      </div> 
    )
  }


}

export default Title

{/* <input onChange={Handlers} value={state}   className = "InputC" /> */}