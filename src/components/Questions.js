import React from "react";
import Input from "./Input";
import '../App.css' 


const Questions = ({QuestionsArray,Handlers,StateArray}) => {
  return(
    <div>
        {QuestionsArray.map((question,index) => {
          return( 
            <div className='ContainerC' key = {index}>
              <div className = "QuestionTextC"> {question} </div> 
              <Input Handlers = {Handlers[index]} state = {StateArray[index]}  />
            </div>
          )
        })}
    </div>
  )
}


export default Questions