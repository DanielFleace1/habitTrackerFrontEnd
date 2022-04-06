import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import serverFunctions from "../srcUtils/serverFunctions";
import SignUpvalidation from "../srcUtils/validation";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "../styling/SignUp.css" ;
import "../styling/SignIn.css" ;

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"></link>

const SignIn = () => {
    // State & inital State values
    const initialValues = {
        email: '',
        password: '',
        showPassword:'password',
    };
    const [severity, setSeverity] = useState('')
    const [alertMsg,setAlertMsg] = useState('')
    const [values, setValues] = useState(initialValues);
    // Navigate after successful login
    const navigate = useNavigate();
    // handler functions
    // handle submit of sign up for 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{    
            let reqObj = {
                email: values.email.toLowerCase(),
                password: values.password
            }
            let user = await serverFunctions.login(reqObj)
            window.localStorage.setItem('loggedOn', JSON.stringify(user)) 
            // Success Message
            setAlertMsg('You have been Sucessfully Signed in! Redirecting to the App!')
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
        // Handle input changes to Sign Up Fields 
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
    }
    const handleShowPassword = () => {
        setValues({
            ...values,
            showPassword: showPassword === 'password' ? 'text' : 'password'
          })
    }

    const handleForgotPassWord = (e) => {
        e.preventDefault()
        setAlertMsg('This feature is still being developed.')
        setSeverity('info')
        setTimeout(() => {
            setAlertMsg('')
        },3000)
    }

    // Destruct values obj
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
                    <TextField required type ="text" name ="email" value = {email}   onChange={(e) => handleInputChange(e)} size="small" sx={{width: '340px',paddingTop: '5px',paddingBottom:'22px'}}  label="Email" variant="outlined" /><br/>
                    <TextField  required type = {showPassword} name ="password" value ={password} onChange={(e) => handleInputChange(e)} size ="small" sx={{width: '340px',paddingTop: '5px', marginBottom : '0px'}}  helperText="Must contain: 8+ characters, one uppercase, one lowercase, & one special character!" label="Password" variant="outlined" />
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
        </div>
    )
}

export default SignIn