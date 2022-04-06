import '../styling/ManageHabits.css';
import { useOutletContext,useNavigate } from "react-router-dom";
import { Dialog, DialogTitle,Menu,MenuItem } from '@mui/material'
import { useState } from 'react';
import serverFunctions from '../srcUtils/serverFunctions';

function ManageHabits() {
    const [values,setValues] = useOutletContext();
    const [deleteDialog,setDeleteDialog] = useState( false);
    const [deleteId,setDeleteId] = useState('')
    const[deleteName,setDeleteName] = useState('')
    // Access Local Storage
    const loggedUserJSON = window.localStorage.getItem('loggedOn')
    let user = JSON.parse(loggedUserJSON)

    const navigate = useNavigate();

    const handleClose = () => {
        setDeleteDialog(false)
    }
    const handleOpen = (e) => {
        const {name,id} = e.target
        // cut string off for ... at 15 characters or something 
        setDeleteId(id)
        setDeleteName(name)
        setDeleteDialog(true)
    }
    // Handle User Confirming Delete 
    const handleDelete =  async (e) => {
        try{
            e.preventDefault();
            const obj = {
                habitAryId:deleteId
            }
            const res = await serverFunctions.deleteHabitFromHabitAry(obj,user.habitId,user.token)
            setValues({
                ...values,
                HabitAry:res.habitAry
            })
            setDeleteDialog(false);
        }   
        catch(err){
            if(err.response){
                let alertMsg = err.response.status === 401 ? 'Your session has reached its time limit. You will be automatically logged out. Re-login to resume use of Habits!.' : 'Something went wrong. You will be automatically logged out. Please try again or come back later '
                setValues({
                    ...values,
                    showAlert:true,
                    alertMsg: alertMsg,
                    severity: 'error',
                })
            }
            else{
                let msg = err.message === 'Network Error' ? 'Network Error. You will be automatically logged out. Please try again or come back later ': 'Something went wrong. You will be automatically logged out. Please try again or come back later '
                    setValues({
                        ...values,
                        showAlert: true,
                        alertMsg: msg,
                        severity: 'error',
                });   
            }

            setTimeout(() => {
                console.log('inside st')
                setValues({
                    ...values,
                    showAlert:false,
                    alertMsg:'',
                    severity:''
                })
                localStorage.clear();
                navigate('/SignIn');
              },5000)   
        }
    }

    return(
        <div className="ManageHabitsParent">
            {
                values.HabitAry.map((elm) => {
                    return(
                        <div className='manageHabitsMap1'>
                            <div className='manageHabitsMap2'>{elm.habitName}</div>
                            <div className='manageHabitsMap3'> <button onClick={handleOpen} id ={elm._id} name={elm.habitName} className='manageHabitsBtn'> Delete </button> </div>
                        </div>
                    )
                })
            }
        <Dialog sx={{display:'flex',alignItems:'center',justifyContent:'center'}} autoFocus fullWidth onClose={handleClose} open={deleteDialog}>
                <DialogTitle sx={{textAlign:'center',fontSize: '14px'}}> Delete: {deleteName} </DialogTitle>
                <div className='logoutDialogParent'>
                    <button className='logoutDialogButtons' onClick={handleClose}>Cancel</button><br/>
                    <button className='logoutDialogButtons' onClick={handleDelete} >Delete</button><br/>
                </div> 
        </Dialog>
        </div>
    )
}

export default ManageHabits    