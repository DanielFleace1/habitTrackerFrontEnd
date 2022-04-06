import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import SignUpvalidation from "../srcUtils/validation";
import serverFunctions from "../srcUtils/serverFunctions";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "../styling/SignUp.css" 

 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"></link> 

function SignUp() {
    // State & Inital State values
    const initialValues = {
        username: '',
        email: '',
        password: '',
        showPassword:'password',
    };
    const [severity, setSeverity] = useState('')
    const [alertMsg,setAlertMsg] = useState('')
    const [values, setValues] = useState(initialValues);
    // React Router Use Navigate
    const navigate = useNavigate();
    // Handler Functions
    // Handle Submit of Sign Up For
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Check Validation - Client Side 
        if(typeof(SignUpvalidation(values)) === 'string'){ 
            setAlertMsg(SignUpvalidation(values))
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
            //  Use Sign Up Route to Create User Document in Database
            let user = await serverFunctions.signUp(reqObj)
            let createHabitDocument = await serverFunctions.createHabitDocument({userId: user.userId},user.token)
            let userObj = {                
                token: user.token,
                habitId:createHabitDocument.habitDocId,
                username:user.username
            }
            // Set username &&  userId  & token in local storage
            window.localStorage.setItem('loggedOn', JSON.stringify(userObj)) 
            //  Success Message
            setAlertMsg('You have been Sucessfully Signed up! Redirecting to the App!')
            setSeverity('success')  
            // // Redirect & clear alert form     
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

    // Handle Input Change to Sign Up Form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
    }
    //  Handle State Change from Clicking Show Password
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
        </div>
    )
}

export default SignUp



