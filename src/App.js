import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Title  from './components/Title';
import Questions from './components/Questions';
import Table from './components/Table';
import helpers from './srcUtils/helperFns'
import serverFunctions from './srcUtils/serverFunctions';

function App() {
  //base URL
 
  // State
  const [sleep, setNewSleep] = useState('')
  const [focusW, setFocusW] = useState('')
  const [AppData,setAppData] = useState(undefined)
  const [userID,setUserID] = useState('Daniel Fleace') // for login ??
  //Handler functions 
  
  const handleSubmit = (e) => { 
    const baseURL = 'http://localhost:3001/Stats';   
    e.preventDefault()
    const statsObj ={
      Sleep: sleep ,
      Work: focusW ,
      userID: userID,
      Date: helpers.FormatDate()
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
       })
    }
  }

  const handleSleepChange = (e) => {
    setNewSleep(e.target.value);
  }
  const handleFocusW = (e) => {
    setFocusW(e.target.value);
  }
  // Arrays
  const QuestionsArray = ['Hours of Sleep', 'Focused Work']
  const Handlers = [handleSleepChange,handleFocusW]
  const StateArray = [sleep,focusW]
  const TableArray = ['Date','Sleep','Work']

  // Effects
  useEffect(() => {
    axios
      .get('http://localhost:3001/stats')
      .then(response => {
        setAppData(response.data)
      })
  }, [])

  // Final  Return 
  return ( 
    <div className='Div'>    
      <Title />
      <form className='Form' onSubmit={handleSubmit}>
        <Questions QuestionsArray = {QuestionsArray} StateArray = {StateArray} Handlers = {Handlers} />  
        <div><button type="submit">Submit</button></div> 
      </form>
      <Table AppData = {AppData} TableArray = {TableArray} /> 
    </div>

  );
}
export default App;
