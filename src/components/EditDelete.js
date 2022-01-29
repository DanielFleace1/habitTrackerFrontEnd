import React from 'react'
import Delete from './Delete';
//import Edit from './Edit';
//import Switch from '@mui/material/Switch';

const EditDelete  = ({AppData,setAppData, deleteDate, handleDeleteDateChange, handleDeleteSubmit, openDeleteDia, handleClickOpen, handleClose}) => {
    return(
      <div className ="EditDelete" >
        <Delete AppData = {AppData} setAppData ={setAppData} deleteDate = {deleteDate} handleDeleteSubmit = {handleDeleteSubmit} handleDeleteDateChange = {handleDeleteDateChange} openDeleteDia = {openDeleteDia} handleClickOpen = {handleClickOpen} handleClose = {handleClose} />
      </div>
    )
}

export default EditDelete

