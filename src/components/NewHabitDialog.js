import { Dialog, DialogTitle} from '@mui/material';
import { useState } from 'react';
import '../styling/NavBar.css';
import serverFunctions from '../srcUtils/serverFunctions';
import { useNavigate } from 'react-router-dom'




const NewHabitDialog =  ({values,setValues,open,close,notify}) => {
    // State & Initial Values
    const initialValues = {
        habitName: "",
        habitType:"",
    }
    const [dialogValues,setDialogValues] = useState(initialValues)
    //Local Storage
    const loggedUserJSON = window.localStorage.getItem('loggedOn')
    let user = JSON.parse(loggedUserJSON)

    const navigate = useNavigate();

    // Handler Functions
    // Handle Submit of New Habit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const reqObj = {
                habitName,
                habitType,
            }
            let res = await serverFunctions.addNewHabit(reqObj,user.habitId,user.token)
            setDialogValues({
                ...dialogValues,
                habitName:"",
                habitType:"",
            })
            setValues({
                ...values,
                HabitAry: res.habitAry,
                showAlert:false,
                alertMsg: '',
                severity: '',
            })
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
    // Handle Reset of the Form
    const handleReset = (e) => {
        e.preventDefault();
        setDialogValues({
            ...dialogValues,
            habitName:"",
            habitType:""
        })
    }
    // Handle Input Change to Form
    const handleInputChange = (e) => {
        const {name,value} = e.target
        setDialogValues({
            ...dialogValues,
            [name]:value
        })
    }
    // Destruct State
    const {habitName,habitType} = dialogValues;
    return(
        <div>
        <Dialog fullWidth={true} maxWidth='sm'  open={open} onClose={close} >
            <DialogTitle sx={{textAlign:'center'}}> Create a new Habit  </DialogTitle>
            <form onSubmit={handleSubmit}>
                <input value={habitName} name ="habitName" required onChange={handleInputChange} className = "newHaibitDialogInput" placeholder="Name new habit" /><br/>
                <select name ="habitType" required  onChange={handleInputChange} value={habitType}  placeholder='Select Output Type' className='newHabitDialogOutput'>
                    <option value=""  disabled> Choose a Habit Output Type </option>
                    <option value="number">Number</option>
                    <option value="Y-N">Y-N</option>
                    <option value="1-10"> 1-10 </option>
                    <option value="text"> Free Text </option>
                </select>
                <div className='newHabitDialogBtnsContainer'>
                    <button onClick={handleReset} className='newHabitDialogBtns'> Reset</button>
                    <button className='newHabitDialogBtns'> Submit</button>
                </div>    
            </form>
        </Dialog>
        </div>
    )
}


export default NewHabitDialog