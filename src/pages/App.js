//Styling 
import '../styling/App.css';
// Components
import NavBar from '../components/NavBar';
import NewHabitDialog from '../components/NewHabitDialog'
import { useEffect, useState } from 'react';
import { useNavigate, } from "react-router-dom";
import serverFunctions from '../srcUtils/serverFunctions';
import { Outlet } from 'react-router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';     
// serverfunctions
const App =  () => {
    // State & Initial Values

    const initialValues ={
        loggedUser:'',
        userId:'', 
        token:'',
        newHabit: false,
        HabitAry:[],
        habitId:'',
        alertMsg:'', // Material UI Alert
        severity:'', // Material UI Alert severity. ex. success, error
        showAlert:false, // show material UI alert 
        loadingMsg:'Loading...',
    }
    const [values,setValues] = useState(initialValues)

    // React Router Navigate
    const navigate = useNavigate();
    // Effects
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedOn')
        let user = JSON.parse(loggedUserJSON)
        if(!loggedUserJSON) {
            alert('Please Sign in to use the app!')
            navigate('/SignIn')  
        }
        // set User Credentials in State
        const fetchdata = async () => {
            try{
                const res =  await serverFunctions.getUserHabitDocument(user.habitId,user.token)
                    if(!res.habitAry[0]){
                        setValues({
                            ...values,
                            loadingMsg:'Start by clicking on  "Add Habit++"  to track a habit! Click "How to use App" for more info.',
                            loggedUser:user.username,
                            token:user.token,
                            habitId:user.habitId
                        })
                    }
                    else{
                        setValues({
                            ...values,
                            HabitAry: res.habitAry,
                            loggedUser:user.username,
                            token:user.token,
                            habitId:user.habitId
                        })
                    }
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
        fetchdata()
    },[ ])

    // Handlers
    // Handle Click of New Habit Button
    const handleNewHabitOpen = () => {
        setValues({
            ...values,
            newHabit: true  
        })
    }
    // Close New Habit Dialog
    const handleHabitDialogClose = () => {
        setValues({
            ...values,
            newHabit: false
        })
    }

    //Destruct State Values 
    const{loggedUser,newHabit, severity,alertMsg,showAlert ,loadingMsg} = values
    return(     
        <div className="appParent"> 
            <NavBar LoggedUser = {loggedUser} />
            <div className='appMain'>
                <div className='appMainHeader'> 
                    <div className='appMainHeaderTitle'> Habits </div>
                    <div className='appMainSpacer2'>
                        <button onClick={handleNewHabitOpen} className='appAddHabitBtn'> Add Habit ++ </button>
                    </div>
                </div>
                {
                    values.HabitAry[0] &&  <Outlet context={[values, setValues]}/>
                }
                {
                    !values.HabitAry[0] &&  
                    <div style = {{display:'flex',justifyContent:'center', paddingTop:'40px'}}>
                        <div style={{ color : 'black ',  fontSize:'22px', fontWeight:'5  00',width:"65%" , textAlign:'center'  }} >{loadingMsg} </div>
                    </div>
                }
               
                <NewHabitDialog  values = {values} setValues={setValues} open={newHabit}  close = {handleHabitDialogClose} />
            </div>

            {showAlert &&
                <Stack sx={{ width: '50%', position:'absolute',top:'20%',left:'20%',textAlign:'center' }} spacing={2}>
                    <Alert severity={severity}>{alertMsg}</Alert>
                </Stack>
            }     
        </div>
    )
}
    
export default App

