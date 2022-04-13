import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import serverFunctions from "../srcUtils/serverFunctions";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "../styling/SignUp.css" ;
import "../styling/SignIn.css" ;

const SignIn = () => {
    // State & inital State values
    const initialValues = {
        email: '',
        password: '',
        showPassword:'password',
    };
    const [severity, setSeverity] = useState('info')
    const [alertMsg,setAlertMsg] = useState('')
    const [values, setValues] = useState(initialValues);
    // React Router - Navigation 
    const navigate = useNavigate();

    // Handler Functions
    const handleSubmit = async (e) => {
        // Handle Submit of Sign In 
        e.preventDefault()
        setAlertMsg('Attempting to Sign In!')
        setSeverity('info')  
        try{    
            let reqObj = {
                email: values.email.toLowerCase(),
                password: values.password
            }
            let user = await serverFunctions.login(reqObj)
            window.localStorage.setItem('loggedOn', JSON.stringify(user)) 
            // Success Message
            setAlertMsg('You have been sucessfully signed in! Redirecting to the Habits!')
            setSeverity('success')  
            //Clear State & Navigate to App 
            setTimeout(()=>{
                setAlertMsg('')
                navigate('/App') 
            },2000)
        }
        catch(err){
            // Error Message 
            if(err.response){
                let msg = err.response.data.error === undefined ? 'Something went Wrong. Please try again.': err.response.data.error;
                setAlertMsg(msg)
                setSeverity('error')
            }
            // Network Error
            else{
                let msg = err.message === 'Network Error' ? 'Network Error': 'Something went wrong. Please try again.'
                setAlertMsg(msg)
                setSeverity('error')
            }
            // Clear Error Message
            setTimeout(()=>{
                setAlertMsg('')
            },2000)
        }
    }
    const handleInputChange = (e) => {
        // Handle Input Changes to Sign Up Fields 
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
    }
    const handleShowPassword = () => {
        // Handle Show Password Change
        setValues({
            ...values,
            showPassword: showPassword === 'password' ? 'text' : 'password'
          })
    }

    const handleForgotPassWord = (e) => {
        //  Handle Click forgot Password
        e.preventDefault()
        setAlertMsg('This feature is still being developed.')
        setSeverity('info')
        setTimeout(() => {
            setAlertMsg('')
        },3000)
    }

    const handleDemo = (e) => {
        // Handle Click See Demo
        e.preventDefault()
        setAlertMsg('Go to Sign In page & try email: dandevs@gmail.com & Password: " Daniel12! ". Once in the app click "How to use".    ')
        setSeverity('info')
        setTimeout(() => {
            setAlertMsg('')
        },9000)
    }

    // Destruct Values Object 
    const {email ,password,showPassword} = values

    return (
        <div className="siParent">
            <div className="siParentAlerts">
                {alertMsg &&
                    <Stack sx={{ width: '100%', }} spacing={2}>
                        <Alert severity={severity}>{alertMsg}</Alert>
                    </Stack>
                }      
            </div>
            <div className="siContainer">
                <Link className = "siChomeLink" to = "/"> HomePage </Link>
                <div className="siCtitle">  Welcome back, sign in!</div>
                <form onSubmit={handleSubmit}>
                    <TextField required type ="text" name ="email" value = {email}   onChange={handleInputChange} size="small" sx={{width: '340px',paddingTop: '5px',paddingBottom:'22px'}}  label="Email" variant="outlined" /><br/>
                    <TextField  required type = {showPassword} name ="password" value ={password} onChange={handleInputChange} size ="small" sx={{width: '340px',paddingTop: '5px', marginBottom : '0px'}}  helperText="Must contain: 8+ characters, one uppercase, one lowercase, & one special character!" label="Password" variant="outlined" />
                    <div className="si_showPasswordEye">
                        <i className="far fa-eye" onClick={handleShowPassword}></i>
                    </div>
                    <div className="siCBtmFlex">
                        <button className="siCBtn"> Login!</button>
                        <div className="siCBtmFlex2">
                            <div className="siCtoLogin"><Link className="siCtoSignUp" to = "/SignUp"> Don't have an account yet ? </Link></div>
                            <div className="siCtforgotPass"><button onClick={handleForgotPassWord} className="siCtforgotPassBtn"> <i> Or forgot password?</i></button> </div>
                        </div>
                    </div>
                </form> 
            </div>
            <button onClick={handleDemo} className="demoAccBtn"> Wanna see a demo account?</button>
        </div>
    )
}

export default SignIn