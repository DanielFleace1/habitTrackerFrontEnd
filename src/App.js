import React, { useState } from 'react'
import './App.css';
import Title  from './components/Title';
import Questions from './components/Questions';



// const SleepInput = ({handleSleepChange}) => {
//   return(
//     <input onChange={handleSleepChange} className = "InputC" />
//   )
// }
// const FocusWinput = ({handleFocusW}) => {
//   return(
//     <input onChange={handleFocusW} className = "InputC" />
//   )
// }
// const Input = ({Handlers}) => {
//   console.log('type of handlers', typeof(Handlers))
//   console.log(Handlers)
//   return(
//     <input onChange={Handlers} className = "InputC" />
//   )
// }


// const Questions = ({handleSleepChange,focusW,handleFocusW,sleep,handleSubmit}) => {
  
//   const Questions = ['Hours of Sleep', 'Focused Work']
//   const Handlers = [handleSleepChange,handleFocusW]
//   //console.log(typeof(Handlers[0]))
//   return(
//     <div>
//       <form onSubmit={handleSubmit}>


//         {Questions.map((question,index) => {
//           return( 
//             <div className='ContainerC' key = {index}>
//               <div className = "QuestionTextC"> {question} </div> 
//               <Input Handlers = {Handlers[index]} />
//             </div>
//           )

//         })}

//         {/* <div className='ContainerC'>
//           <div className = "QuestionTextC"> Hours of sleep </div> 
//           <SleepInput handleSleepChange = {handleSleepChange}/>
//         </div>


//         <div className='ContainerC'>
//           <div className = "QuestionTextC"> Hours of focused work? </div> 
//           <FocusWinput handleFocusW = {handleFocusW}/>
//       </div> */}
//         <div><button type="submit">Submit</button></div> 
//       </form>
//     </div>
//   )
// }

function App() {
  // State
  const [sleep, setNewSleep] = useState('')
  const [focusW, setFocusW] = useState('')
  //Handler functions 
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('sleep',sleep)
    console.log('focusW:',focusW)
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
  
  // Return 
  return (
    
    // Parent container 
    <div >
     
      {/* Components */}
      <Title />
      <form onSubmit={handleSubmit}>
        <Questions QuestionsArray = {QuestionsArray} Handlers = {Handlers} />  
        <div><button type="submit">Submit</button></div>  
      </form>
      
      
      {/* End Components  */}
    </div>
  );
}

export default App;
