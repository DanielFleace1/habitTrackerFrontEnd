import '../styling/EnterData.css';
import { useOutletContext,useNavigate } from "react-router-dom";
import { useState } from 'react';
import serverFunctions from '../srcUtils/serverFunctions';


const EnterData = () =>{
  
    // State
    const [values,setValues] = useOutletContext();
    const [form,setForm] = useState({})
    const [date,setDate] = useState(new Date().toISOString().split('T')[0])
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
    // Handlers
    // Handle Change to Input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]:value,
        })
    }
    // Local Storage
    const loggedUserJSON = window.localStorage.getItem('loggedOn')
    let user = JSON.parse(loggedUserJSON)
    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
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
                alertMsg:'Habit successfully submitted',
                severity:'success'
            })
            console.log('after set values::',values.HabitAry)
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

    // Handle Date Change 
    const handleDateChange = (e) => {
        e.preventDefault()
        setDate(e.target.value)
    }




    // Returns
    if(values === undefined){
        return (
            <div>
                LOADING....
            </div>
        )
    }
    else{
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
                                    <input required className='enterDataFormInput'  placeholder ={typeHelper[index.habitType].placeholder} min={typeHelper[index.habitType].min} max={typeHelper[index.habitType].max} type={typeHelper[index.habitType].type} name = {index._id} id ={index._id}  onChange={(e) => handleInputChange(e)} /> 
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
}

export default EnterData    


