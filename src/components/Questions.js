import React from "react";
import Input from "./Input";
import '../App.css'


const Questions = ({QuestionsArray,Handlers}) => {
  return(
    <div>
        {QuestionsArray.map((question,index) => {
          return( 
            <div className='ContainerC' key = {index}>
              <div className = "QuestionTextC"> {QuestionsArray} </div> 
              <Input Handlers = {Handlers[index]} />
            </div>
          )
        })}
    </div>
  )
}


export default Questions