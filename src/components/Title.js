import Login from "./Login";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Title = ({date,handleDateChange,submissionAlert,handleUserSubmit,handleUserChange,handlePassChange,username,password,user, handleLogout }) => {  
 
  const submissionAlertArray = ['success','info','error']
  const submissionAlertMessage = [`Your submission for ${date} was successful!`,' Form & date reset','Username or password incorrect']
  let index = submissionAlertArray.findIndex(item => item === submissionAlert)

  if(submissionAlert !== null){
    return(    
      <div className="TitleC">
        <div className="titleText"> Habits </div>
        <div className="titleSecondRow">
          <div className = 'submissionAlerts'> 
            <Stack sx={{height: '100', width:'98%' }} spacing={2}>
            <Alert sx={{height: '100%' }} severity={submissionAlert}>{submissionAlertMessage[index]}</Alert>
            </Stack> 
          </div>
          <div className = 'datePicker'>           
            <LocalizationProvider   dateAdapter={AdapterDateFns}>
              <DatePicker  label="Enter Data for:" value={date} onChange={handleDateChange} renderInput={(params) => <TextField  {...params} />}/>
            </LocalizationProvider> </div>
          <div className = 'login'> 
          <Login username={username} password={password} handleUserChange={handleUserChange} handlePassChange={handlePassChange} user = {user} handleLogout={handleLogout} handleUserSubmit={handleUserSubmit} />
          </div>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className="TitleC">
      <div className="titleText"> Habits </div>
      <div className="titleSecondRow">
        <div className = 'submissionAlerts'> </div>
        <div className = 'datePicker'>           
          <LocalizationProvider   dateAdapter={AdapterDateFns}>
            <DatePicker  label="Enter Data for:" value={date} onChange={handleDateChange} renderInput={(params) => <TextField  {...params} />}/>
          </LocalizationProvider> </div>
        <div className = 'login'> 
        <Login username={username} password={password} handleUserChange={handleUserChange} handlePassChange={handlePassChange} user = {user} handleLogout={handleLogout} handleUserSubmit={handleUserSubmit} />
        </div>
      </div>
    </div>
    )
  }
}   
   
export default Title

