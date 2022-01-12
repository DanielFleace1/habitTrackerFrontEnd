import React from "react";
import NumberPicker from "react-widgets/NumberPicker";
import Input from "./Input";
import '../App.css' 



const Questions = ({QuestionsArray,Handlers,StateArray}) => {
  
  return(
    <div>
        {QuestionsArray.map((question,index) => {
          if(QuestionsArray[index] === 'Hours of Sleep' || QuestionsArray[index] === 'Focused Work'  ||  QuestionsArray[index] === 'Work: 0-10?' || QuestionsArray[index] === 'Health: 0 - 10' || QuestionsArray[index] === 'Overall day: 0-10' ){
            return( 
            <div className='ContainerC' key = {index}>
              <div className = "QuestionTextC"> {question} </div> 
              <NumberPicker className="numberPicker" />
              {/* <Input Handlers = {Handlers[index]} state = {StateArray[index]}  /> */}
            </div>
          )}

          // else if(QuestionsArray[index] === 'Did you exercise?' ){
          //   return(
          //   <div className='ContainerC' key = {index}>
          //   <div className = "QuestionTextC"> {question} </div> 
          //   <select onChange={Handlers[index]} defaultValue={"DEFAULT"}  >
          //     <option value="DEFAULT" disabled>Choose a Workout ...</option>
          //     <option value = "Weight Lifting"> Weight Lifting</option>
          //     <option value = "Cardio">Cardio </option>
          //     <option value = "Yoga">Yoga</option>
          //     <option value = "Scheudled off">Scheudled off</option>
          //     <option value = "Missed">Missed</option>
          //   </select>
          //   </div>)
          // }
          // else if(QuestionsArray[index] === 'Did you hit nutrional goals?' ){
          //   return(
          //   <div className='ContainerC' key = {index}>
          //     <div className = "QuestionTextC"> {question} </div> 
          //     <select onChange={Handlers[index]} defaultValue={"DEFAULT"}  >
          //     <option value="DEFAULT" disabled>Yes/No</option>
          //       <option value = "Yes"> Yes</option>
          //       <option value = "No">No</option>
          //     </select>
          //   </div>)
          // }
          // else if(QuestionsArray[index] === 'Positive notes about day?' ){
          // return(
          // <div className='ContainerC' key = {index}>
          //   <div className = "QuestionTextC"> {question} </div> 
          //   <textarea name="posNotes" onChange={Handlers[index]} rows="4" cols="50" />
          // </div>)
          // }
          // else if( QuestionsArray[index] === 'Negative notes about day?'){
          //   return(
          //   <div className='ContainerC' key = {index}>
          //   <div className = "QuestionTextC"> {question} </div> 
          //   <textarea name="NegNotes" onChange={Handlers[index]} rows="4" cols="50" />
          // </div>)
          
          // }
          // else {return(
          // <div key = {index}> Error
          // </div>)
          // }
        })}
    </div>
  )




}


export default Questions