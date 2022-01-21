import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Title  from './components/Title';
import Questions from './components/Questions';
import Table from './components/Table';
import helpers from './srcUtils/helperFns'
import serverFunctions from './srcUtils/serverFunctions';
import { format, set } from 'date-fns';
import Resubmission from './dialogs/resubmission';
// import NumberPicker from "react-widgets/NumberPicker";
// import DeleteButton from './components/Delete';



const clone = require('rfdc')()


// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import setDate from 'date-fns/setDate';


function App() {
  //base URL
  // State
  const [sleep, setNewSleep] = useState('')
  const [focusW, setFocusW] = useState('')
  const [exercise,setExercise] = useState('')
  const [NGs, setNGs] = useState('')
  const [workRating,setWorkRating] = useState('')
  const [healthRating,setHealthRating] = useState('')
  const [overall, setOverall] = useState('')
  const [posNotes,setPosNotes] = useState('')
  const [negNotes,setNegNotes] = useState('')
  const [AppData,setAppData] = useState(undefined)
  const [userID,setUserID] = useState('Daniel Fleace') // for login ??
  const [date, setDate] = useState(format(new Date, 'yyyy/MM/dd'))
  const [ deleteDate, setDeleteDate] = useState(format(new Date,"yyyy/MM/dd"))
  const [submissionAlert, setSubmissionAlert] = useState(null)
  const [openDeleteDia,setOpenDeleteDia] = useState(false)
  const [openResub, setOpenResub] = useState(false)
 
  //Handler functions 
  const handleSubmit = (e) => { 
    
    e.preventDefault()
    const statsObj ={
      Sleep: sleep ,
      Work: focusW ,
      Exercise: exercise,
      NGs:NGs,
      workRating: workRating,
      healthRating: healthRating,
      overall: overall,
      posNotes:posNotes,
      negNotes:negNotes,
      userID: userID,
      Date: date 
    }
    const stat = helpers.checkEntry(AppData,statsObj.Date) 
    // Entry For Date already exists 
    if(stat > -1){
        setOpenResub(true)
  }
    // New Entry 
    else{
     serverFunctions.create(statsObj)
      .then(response => { 
        setSubmissionAlert('success')
        setTimeout(() => {
          setSubmissionAlert(null)
          }, 3000)
        setAppData(AppData.concat(response.data));
        setNewSleep('')
        setFocusW('')
        setExercise('')
        setNGs('')
        setWorkRating('')
        setHealthRating('')
        setOverall('')
        setPosNotes('')
        setNegNotes('')
       })
    }
  }

  const handleClearAllInputs = () => {
    setSubmissionAlert('info')
    setTimeout(() => {
      setSubmissionAlert(null)
      }, 3000)
    setNewSleep('')
    setFocusW('')
    setExercise('')
    setNGs('')
    setWorkRating('')
    setHealthRating('')
    setOverall('')
    setPosNotes('')
    setNegNotes('')  
    setDate(format(new Date, 'yyyy/MM/dd'))
  }

  const handleSleepChange = (e) => {
    setNewSleep(e.target.value);
  }
  const handleFocusWchange = (e) => {
    setFocusW(e.target.value);
  }
 const handleExerciseChange = (e) => {
   setExercise(e.target.value)
 }
 const handleNutrionalChange = (e) => {
  setNGs(e.target.value)
  }
  const handleWorkChange = (e) => {
    setWorkRating(e.target.value)
  }
  const handleHealthChange = (e) => {
    setHealthRating(e.target.value)
  }
  const handleOverallChange = (e) => {
    setOverall(e.target.value)
  } 
  const handelPositiveNoteChange = (e) => {
    setPosNotes(e.target.value)
  }
  const handleNegativeNoteChange = (e) => {
    setNegNotes(e.target.value)
  }
  const handleDateChange = (newValue) => {
    setDate(format(newValue, 'yyyy/MM/dd'))
  }
   const handleTableChange = (a,b) => {
 }
  const handleDeleteDateChange = (newValue) => {
    setDeleteDate(format(newValue,"yyyy/MM/dd"))
  }
  const handleDeleteSubmit = (e) => {
    e.preventDefault()    
        const index = AppData.findIndex(element => element.Date === deleteDate)
        const backEndid = AppData[index].id
        serverFunctions.remove(backEndid)
          .then((res) => {
            let AppDataClone = clone(AppData)
            AppDataClone.splice(index,1)   
            setAppData(AppDataClone)
            setOpenDeleteDia(false)
          })
          .catch((err) => {
            console.log(err)
          })
  }
  const handleClickOpen =  () => {
    setOpenDeleteDia(true)
  }  
  const handleClose = () => {
    console.log('close')
    setOpenDeleteDia(false)
    setOpenResub(false)
  } 
  const handleResub = () => {
    console.log('resub')
    setOpenResub(false)
    console.log('resub')
    const statsObj ={
      Sleep: sleep ,
      Work: focusW ,
      Exercise: exercise,
      NGs:NGs,
      workRating: workRating,
      healthRating: healthRating,
      overall: overall,
      posNotes:posNotes,
      negNotes:negNotes,
      userID: userID,
      Date: date 
    }
    const stat = helpers.checkEntry(AppData,statsObj.Date) 
    serverFunctions.update(AppData[stat].id,statsObj)
    .then(response =>{
      setAppData( AppData.map(stat => stat.Date !== statsObj.Date ? stat : response.data) )
      //setPersons(persons.map(prsn=> prsn.id !== person.id ? prsn : response.data))      
      setNewSleep('')
      setFocusW('')
      setExercise('')
      setNGs('')
      setWorkRating('')
      setHealthRating('')
      setOverall('')
      setPosNotes('')
    })
  } 








  // Arrays
  const QuestionsArray = ['Hours of Sleep?', 'Focused Work?', 'Did you exercise?' , 'Did you hit nutrional goals?','Work: 0-10?', 'Health: 0 - 10?', 'Overall day: 0-10?', 'Positive notes about day?', 'Negative notes about day?']
  const Handlers = [handleSleepChange,handleFocusWchange, handleExerciseChange, handleNutrionalChange, handleWorkChange, handleHealthChange, handleOverallChange, handelPositiveNoteChange, handleNegativeNoteChange]
  const StateArray = [sleep,focusW,exercise,NGs,workRating, healthRating, overall,posNotes,negNotes]
  const TableArray = ['Date','Sleep','Work','Exercise','NGs','workRating','healthRating','overall' ,'posNotes','negNotes']

  //Front End URL
  //const baseUL = 'http://localhost:3001/stats'

  //BackEnd URL
  const baseURL = 'http://localhost:3001/api/data'


  // Effects
  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setAppData(response.data)
      })
  }, [])




  // Final  Return 
  return ( 
    <div>    
      <Title date = {date} handleDateChange={handleDateChange} submissionAlert = {submissionAlert}/>
      <div className='formTable'>
      <form className='Form' onSubmit={handleSubmit}>
        <Questions QuestionsArray = {QuestionsArray} StateArray = {StateArray} Handlers = {Handlers} />  
        <div><button className='submitButton' type="submit">Submit</button></div>
        <div><button type ="reset" className ='submitButton' onClick = {handleClearAllInputs} > Reset Form & Date </button></div>
      </form>
      <Table className="table" AppData={AppData} TableArray={TableArray} handleTableChange={handleTableChange} date = {date} deleteDate ={deleteDate} handleDeleteDateChange = {handleDeleteDateChange} handleDeleteSubmit = {handleDeleteSubmit} openDeleteDia = {openDeleteDia} handleClickOpen = {handleClickOpen} handleClose = {handleClose}/>
      </div>
      <Resubmission openResub ={openResub} handleClose = {handleClose} date = {date} handleResub={handleResub}/>
    </div>
  );
}
export default App
