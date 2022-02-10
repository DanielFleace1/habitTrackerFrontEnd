import React, { useState, useEffect } from 'react'
import './App.css';
import Title  from './components/Title';
import NullTable from './components/NullTable';
import Questions from './components/Questions';
import Table from './components/Table';
import helpers from './srcUtils/helperFns'
import serverFunctions from './srcUtils/serverFunctions';
import {format} from 'date-fns';
import Resubmission from './components/resubmission';
const clone = require('rfdc')()

function App() {
  // State Hooks
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
  const [date, setDate] = useState(format(new Date(), 'yyyy/MM/dd'))
  const [ deleteDate, setDeleteDate] = useState(format(new Date(),"yyyy/MM/dd"))
  const [submissionAlert, setSubmissionAlert] = useState(null )
  const [openDeleteDia,setOpenDeleteDia] = useState(false)
  const [openResub, setOpenResub] = useState(false)
  const [username, setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  //Handler functions 
  const handleUserChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }
  const handleUserSubmit =  async (e) => {
    e.preventDefault()
    try{
      const user = await serverFunctions.login({username,password})
      serverFunctions.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(
        'loggedOn', JSON.stringify(user)
      ) 
      let data = await serverFunctions.getAll()
      setAppData(data)
      setUsername('')
      setPassword('')  
    }
    catch(exception){

      setSubmissionAlert('error')
      setTimeout(() => {
        setSubmissionAlert(null)
        }, 3000)
    }
  }
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
      userId:user.userId,
      Date: date,
    }
    // Check app data to see if date to be entered already exists. AppData is only logged in user.
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
        setAppData(AppData.concat(response));
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
      .catch((err) => {
        console.log('catch error in serverfunctions create app:',err)
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
    setDate(format(new Date(), 'yyyy/MM/dd'))
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
 const handleNutritionalChange = (e) => {
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
            setDeleteDate(format(new Date(),"yyyy/MM/dd"))
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
    setOpenDeleteDia(false)
    setOpenResub(false)
  } 
  const handleResub = () => {
    setOpenResub(false)
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
      Date: date 
    }
    // Get ID by index of entry with same Date. 
    const stat = helpers.checkEntry(AppData,statsObj.Date) 
    serverFunctions.update(AppData[stat].id,statsObj)
    .then(response =>{
      setAppData( AppData.map(stat => stat.Date !== statsObj.Date ? stat : response.data) )
      setNewSleep('')
      setFocusW('')
      setExercise('')
      setNGs('')
      setWorkRating('')
      setHealthRating('')
      setOverall('')
      setPosNotes('')
      setNegNotes('')
      setDate(format(new Date(), 'yyyy/MM/dd'))
    })
  } 
  const handleLogout = () => {
    setUser(null)
    setDeleteDate(format(new Date(),"yyyy/MM/dd"))
    setDate(format(new Date(),"yyyy/MM/dd"))
    window.localStorage.clear()
  }
  // Arrays
  const QuestionsArray = ['Hours of sleep?', 'Focused work?', 'Did you exercise?' , 'Did you hit nutritional goals?','Work: 0-10?', 'Health: 0 - 10?', 'Overall day: 0-10?', 'Positive notes about day?', 'Negative notes about day?']
  const Handlers = [handleSleepChange,handleFocusWchange, handleExerciseChange, handleNutritionalChange, handleWorkChange, handleHealthChange, handleOverallChange, handelPositiveNoteChange, handleNegativeNoteChange]
  const StateArray = [sleep,focusW,exercise,NGs,workRating, healthRating, overall,posNotes,negNotes]
  const TableArray = ['Date','Sleep','Work','Exercise','NGs','workRating','healthRating','overall' ,'posNotes','negNotes']
  //Effects
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedOn')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      serverFunctions.setToken(user.token)
      serverFunctions.getAll()
        .then((res) => {
          setAppData(res)
        })
    }
  }, [])


  // Final  Return 
  return ( 
    <div> 
      <Title date = {date} handleDateChange={handleDateChange} submissionAlert = {submissionAlert} username={username} password={password} handleUserChange={handleUserChange} handlePassChange={handlePassChange} handleUserSubmit={handleUserSubmit} user = {user} handleLogout={handleLogout}/>  
      {/* <div className='formTable'>
      <form  onSubmit={handleSubmit}>
        <Questions QuestionsArray = {QuestionsArray} StateArray = {StateArray} Handlers = {Handlers} />  
        {
        user === null ?
        <div></div>:
        <div>
        <div><button className='submitButton' type="submit">Submit</button></div>
        <div><button type ="reset" className ='submitButton' onClick = {handleClearAllInputs} > Reset form & date </button></div>
        </div>
        }
      </form>
      {
        user === null ?
        <NullTable/>:
        <Table className="table" AppData={AppData} TableArray={TableArray} handleTableChange={handleTableChange} date = {date} deleteDate ={deleteDate} handleDeleteDateChange = {handleDeleteDateChange} handleDeleteSubmit = {handleDeleteSubmit} openDeleteDia = {openDeleteDia} handleClickOpen = {handleClickOpen} handleClose = {handleClose}/>
      } 
      </div>
      <Resubmission openResub ={openResub} handleClose = {handleClose} date = {date} handleResub={handleResub}/> */}
    </div>
  );
}
export default App



