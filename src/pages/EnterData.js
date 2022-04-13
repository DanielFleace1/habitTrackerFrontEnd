import { useState } from 'react';
import { useOutletContext,useNavigate } from "react-router-dom";    
import '../styling/EnterData.css';
import serverFunctions from '../srcUtils/serverFunctions';
import validation from '../srcUtils/validation'

const EnterData = () =>{   
      
    // Format Date
      function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // State 
    const [values,setValues] = useOutletContext();
    const [form,setForm] = useState({})
    const [date,setDate] = useState(formatDate(new Date()))

    const navigate = useNavigate();
    // Form Helper
    const typeHelper = {
        'number':{
                    placeholder:'Enter a Number',
                    type:'number',
                    min:'0', 
                    max:'999999'
            },
        'Y-N': {
                placeholder:'1 for Yes, 0 for No',
                type:'number',
                min:'0', 
                max:'1'
                },
        '1-10': {
                placeholder:'Enter a Number 1-10',
                type:'number',
                min:'0', 
                max:'10'
                },
        'text': {
                placeholder:'Enter a Note!',
                type:'text',
                min:'0', 
                max:'1'
                },        
    }
    // Local Storage
    const loggedUserJSON = window.localStorage.getItem('loggedOn')
    let user = JSON.parse(loggedUserJSON)
    // Handlers
    const handleInputChange = (e) => {
        // Handle Change to Input
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]:value,
        })
    }
    const handleSubmit = async (e) => {
        // Handle Submit
        e.preventDefault()
        if(validation.DateValidation(date) !== true){
            // Require user to enter valid date format
            setValues({
                ...values,
                showAlert:true,
                alertMsg:validation.DateValidation(date),
                severity:'error'
            })
            setTimeout(() => {
                setValues({
                    ...values,
                    showAlert:false,
                    alertMsg:'',
                    severity:''
                })
              },2500)  
              return 
        }

        const newHabitData = []
        for (const property in form){
            newHabitData.push({ 
                id: property,
                Date:date, 
                value:form[property]
        })}
        try{
            await serverFunctions.addToHabitData({newHabitData:newHabitData},user.habitId,user.token)
            const getRes =  await serverFunctions.getUserHabitDocument(user.habitId,user.token)
            setValues({
                ...values,
                showAlert:true,
                alertMsg:'Habit successfully submitted!',
                severity:'success'
            })
            setForm({...form,
                
            })
            setTimeout(() => {
                setValues({
                    ...values,
                    HabitAry: getRes.habitAry,
                    showAlert:false,
                    alertMsg:'',
                    severity:''
                })
              },1000)   
        }
        catch(err){
            if(err.response){
                let alertMsg = err.response.status === 401 ? 'Your session has reached its time limit. You will be automatically logged out. Re-login to resume use of Habits!' : 'Something went wrong. You will be automatically logged out. Please try again or come back later. '
                setValues({
                    ...values,
                    showAlert:true,
                    alertMsg: alertMsg,
                    severity: 'error',
                })
            }
            else{
                let msg = err.message === 'Network Error' ? 'Network Error. You will be automatically logged out. Please try again or come back later. ': 'Something went wrong. You will be automatically logged out. Please try again or come back later.'
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
    const handleDateChange = (e) => {
        // Handle Date Change 
        e.preventDefault()
        setDate(e.target.value)
    }
    return(
        <div className='enterDataParent' >
            <div className='enterDataHeaderContainer'>
                <div className='enterDataHeaderText' > Fill out Habits for: </div>
                <div className='enterDataDateInputContainer'>
                    <input  className='enterDataDateInput' type = "date" value = {date} onChange={handleDateChange}/>
                </div>  
            </div> 
            <form className="enterDataForm" onSubmit={handleSubmit}>
                {
                    values.HabitAry.map(index => {
                        return(
                            <div key = {index._id} className="enterDataFormContainer" >
                                <div className="enterDataFormNames">{index.habitName} : </div>
                                <div className='enterDataFormInputContainer'>
                                    <input required className='enterDataFormInput'   placeholder ={typeHelper[index.habitType].placeholder} min={typeHelper[index.habitType].min} max={typeHelper[index.habitType].max} type={typeHelper[index.habitType].type} name = {index._id} id ={index._id}  onChange={(e) => handleInputChange(e)} /> 
                                </div>
                            </div>
                    )}) 
                }
                <div className='enterDataButtonContainer'>
                    <button className = "enterDataButton">Submit</button>
                </div>
            </form>
        </div>
    )
}


export default EnterData    


