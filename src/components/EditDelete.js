import React, { useState, useEffect } from 'react'
import Edit from './Edit';
import Delete from './Delete';
import Switch from '@mui/material/Switch';




const EditDelete  = ({AppData,setAppData, deleteDate, handleDeleteDateChange, handleDeleteSubmit}) => {
  const [edit,setEdit] = useState(true)
  
  const handleEditToggle = () => {
    setEdit(edit ? false : true );
  }

  if(edit){
    return(
      <div className ="EditDelete" >
        <div> Edit <Switch onChange={handleEditToggle}/> Delete </div>
        <Edit AppData = {AppData}/>
      </div>
    )
  }

  else {
    return(
      <div className ="EditDelete" >
        <div> Edit <Switch onChange={handleEditToggle}/> Delete </div>
        <Delete AppData = {AppData} setAppData ={setAppData} deleteDate = {deleteDate} handleDeleteSubmit = {handleDeleteSubmit} handleDeleteDateChange = {handleDeleteDateChange} />
      </div>
    )
  }
}



        {/* <LocalizationProvider   dateAdapter={AdapterDateFns}>
            <DatePicker  label="Select Date to edit or delete values:" onChange={()=>{console.log('change');}} renderInput={(params) => <TextField  {...params} />}/>
        </LocalizationProvider> */}




export default EditDelete

