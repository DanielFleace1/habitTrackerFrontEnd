import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import validation from "../srcUtils/validation";
import serverFunctions from "../srcUtils/serverFunctions";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "../styling/SignUp.css" 

function SignUp() {
    // State & Inital State values
    const initialValues = {
        username: '',
        email: '',
        password: '',
        showPassword:'password',
    };
    const [severity, setSeverity] = useState('info')
    const [alertMsg,setAlertMsg] = useState('')
    const [values, setValues] = useState(initialValues);
    // React Router Use Navigate
    const navigate = useNavigate();

    // Handler Functions
    const handleSubmit = async (e) => {
        // Handle Submit of Sign Up For
        // Show loading Message
        e.preventDefault()
        setAlertMsg('Attempting to Sign Up!')
        setSeverity('info')  
        // Check Validation - Client Side 
        if(typeof(validation.SignUpvalidation(values)) === 'string'){ 
            setAlertMsg(validation.SignUpvalidation(values))
            setSeverity('error')
            setTimeout(()=>{
                setAlertMsg('')
            },2000)
            return 
        } 
        try{
            let reqObj = {
                username : values.username,
                email: values.email.toLocaleLowerCase(),
                password : values.password,
            }

            console.log('sign up submit::', reqObj.username)
            //  Use Sign Up Route to Create User Document in Database
            let user = await serverFunctions.signUp(reqObj)
            console.log('user',user)

            let createHabitDocument = await serverFunctions.createHabitDocument({userId: user.userId},user.token)

            let userObj = {                
                token: user.token,
                habitId:createHabitDocument.habitDocId,
                username:user.username
            }
            console.log('username',userObj.username)

            // Set Username && UserId && Token in Local Storage
            window.localStorage.setItem('loggedOn', JSON.stringify(userObj)) 



            //  Success Message
            setAlertMsg('You have been sucessfully signed up! Redirecting to Habits!')
            setSeverity('success')  
            // Redirect & clear alert form     
            setTimeout(()=>{
                setAlertMsg('');
                navigate('/App'); 
            },2000)
        }
        catch(err){
            if(!err.response){
                let msg = err.message === 'Network Error' ? 'Network Error': 'Something went wrong.'
                setAlertMsg(msg);
                setSeverity('error');
            }
            else{
                let msg = err.response.data.error === undefined ? 'Something went wrong. Be sure to use a valid username, email & password' : err.response.data.error
                setAlertMsg(msg);
                setSeverity('error');
            }
            setTimeout(()=>{
                setAlertMsg('')
            },2000)
        }
    }

    const handleInputChange = (e) => {
        // Handle Input Change to Sign Up Form
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
    }

    const handleShowPassword = () => {
        // Handle State Change from Clicking Show Password
        setValues({
            ...values,
            showPassword: showPassword === 'password' ? 'text' : 'password'
          })
    }

    const handleForgotPassWord = (e) => {
        // Handle State Change from Clicking Show Password
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
    const {username, email ,password,showPassword} = values

    return (
        <div className="suParent">
            <div className="suParentAlerts">
                {alertMsg &&
                <Stack sx={{ width: '100%', }} spacing={2}>
                    <Alert severity={severity}>{alertMsg}</Alert>
                </Stack>
                }      
            </div>
            <div className="suContainer">
                <Link className = "suChomeLink" to = "/"> HomePage </Link>
                <div className="suCtitle"> Join Habits!</div>
                <form onSubmit={handleSubmit}>
                    <TextField  type="text" name="username" value = {username}  onChange={(e) => handleInputChange(e)} size="small" sx={{width: '340px',paddingTop: '5px',paddingBottom:'22px'}}  label="First Name" variant="outlined" /><br/>
                    <TextField  type ="text" name ="email" value = {email}   onChange={(e) => handleInputChange(e)} size="small" sx={{width: '340px',paddingTop: '5px',paddingBottom:'22px'}}  label="Email" variant="outlined" /><br/>
                    <TextField  type = {showPassword} name ="password" value ={password} onChange={(e) => handleInputChange(e)} size ="small" sx={{width: '340px',paddingTop: '5px', marginBottom : '0px'}}  helperText="Must contain: 8+ characters, one uppercase, one lowercase, & one special character!" label="Password" variant="outlined" />
                    <div className="showPasswordEye">
                        <i className="far fa-eye" onClick={handleShowPassword}></i>
                    </div>
                    <div className="suCBtmFlex">
                        <button className="suCBtn"> Sign up!</button>
                        <div className="suCBtmFlex2">
                            <div className="suCtoLogin"><Link className="suCtoLogin" to = "/SignIn"> Already have an account? </Link></div>
                            <div className="suCtforgotPass"> <button className="suCtforgotPassBtn" onClick={handleForgotPassWord}><i> Or forgot password?</i> </button></div>
                        </div>
                    </div>  
                </form> 
            </div>
            <button onClick={handleDemo} className="demoAccBtn"> Wanna see a demo account?</button>
        </div>
    )
}

export default SignUp



