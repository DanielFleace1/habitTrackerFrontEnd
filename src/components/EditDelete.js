import React, { useState, useEffect } from 'react'
import Edit from './Edit';
import Delete from './Delete';
import Switch from '@mui/material/Switch';




const EditDelete  = ({AppData,setAppData, deleteDate, handleDeleteDateChange, handleDeleteSubmit, openDeleteDia, handleClickOpen, handleClose}) => {
  const [edit,setEdit] = useState(true)
  
  const handleEditToggle = () => {
    setEdit(edit ? false : true );
  }

  if(edit === false){
    return(
      <div className ="EditDelete" >
        <div> Switch to toggle delete</div> <Switch onChange={handleEditToggle}/> 
        {/* <Edit AppData = {AppData}/> */}
      </div>
    )
  }

  else {
    return(
      <div className ="EditDelete" >
        <div> Switch to toggle delete</div> <Switch onChange={handleEditToggle}/>  
        <Delete AppData = {AppData} setAppData ={setAppData} deleteDate = {deleteDate} handleDeleteSubmit = {handleDeleteSubmit} handleDeleteDateChange = {handleDeleteDateChange} openDeleteDia = {openDeleteDia} handleClickOpen = {handleClickOpen} handleClose = {handleClose} />
      </div>
    )
  }
}







export default EditDelete

