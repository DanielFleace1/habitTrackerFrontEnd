import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Title  from './components/Title';
import Questions from './components/Questions';
import Table from './components/Table';
import helpers from './srcUtils/helperFns'
import serverFunctions from './srcUtils/serverFunctions';
import { format, set } from 'date-fns'
import NumberPicker from "react-widgets/NumberPicker";

import helperFns from './srcUtils/helperFns';


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
  //Handler functions 
  const handleSubmit = (e) => { 
    const baseURL = 'http://localhost:3001/Stats';   
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
      if(window.confirm('You have already submitted an entry for today. Click continue to overwrite all data with listed data now')){
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
            setNegNotes('')
          })
      }
    }
    // New Entry 
    else{
     serverFunctions.create(statsObj)
      .then(response => { 
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
    if(window.confirm('Are you sure you want to clear all inputs from form & Reset Date?')){
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
     console.log('a is',a)
     console.log('b is',b)
 }














  // Arrays
  const QuestionsArray = ['Hours of Sleep?', 'Focused Work?', 'Did you exercise?' , 'Did you hit nutrional goals?','Work: 0-10?', 'Health: 0 - 10?', 'Overall day: 0-10?', 'Positive notes about day?', 'Negative notes about day?']
  const Handlers = [handleSleepChange,handleFocusWchange, handleExerciseChange, handleNutrionalChange, handleWorkChange, handleHealthChange, handleOverallChange, handelPositiveNoteChange, handleNegativeNoteChange]
  const StateArray = [sleep,focusW,exercise,NGs,workRating, healthRating, overall,posNotes,negNotes]
  const TableArray = ['Date','Sleep','Work','Exercise','NGs','workRating','healthRating','overall' ,'posNotes','negNotes']

  // Effects
  useEffect(() => {
    axios.get('http://localhost:3001/api/data')
      .then(response => {
        console.log(response.data)
        setAppData(response.data)
      })
  }, [])




  // Final  Return 
  return ( 
    <div>    

      <Title date = {date} handleDateChange={handleDateChange}/>
      <div className='formTable'>
      <form className='Form' onSubmit={handleSubmit}>
        <Questions QuestionsArray = {QuestionsArray} StateArray = {StateArray} Handlers = {Handlers} />  
        <div><button className='submitButton' type="submit">Submit</button></div>
        <div><button type ="reset" className ='submitButton' onClick = {handleClearAllInputs} > Reset Form & Date </button></div>
      </form>
      <Table className="table" AppData={AppData} TableArray={TableArray} handleTableChange={handleTableChange} date = {date} />
      </div>
      
      

    </div>
  );
}
export default App;
