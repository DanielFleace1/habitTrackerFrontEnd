import NumberInput from "./NumberInput";
import ExerciseInput from "./ExerciseInput";
import NutritionalInput from "./NurtitionalInput"

const Questions = ({QuestionsArray,Handlers,StateArray}) => {
  const labelsArray = ['Hours','Hours','Select Exercise','Yes/No','Rating', 'Rating', 'Rating']
  return(
    <div>
        {QuestionsArray.map((question,index) => {
          if(QuestionsArray[index] === 'Hours of sleep?' || QuestionsArray[index] === 'Focused work?'  ||  QuestionsArray[index] === 'Work: 0-10?' || QuestionsArray[index] === 'Health: 0 - 10?' || QuestionsArray[index] === 'Overall day: 0-10?' ){
            return( 
              <div className='ContainerC' key = {index}>
                <div className = "QuestionTextC"> {question} </div> 
                <NumberInput Handlers = {Handlers[index]} state = {StateArray[index]} label = {labelsArray[index]}  />
              </div>
            )
          }
          else if(QuestionsArray[index] === 'Did you exercise?' ){
            return(
              <div className='ContainerC' key = {index}>
                <div className = "QuestionTextC"> {question} </div> 
                <ExerciseInput Handlers = {Handlers[index]} state = {StateArray[index]} label = {labelsArray[index]} />
              </div>
            )
          }
          else if(QuestionsArray[index] === 'Did you hit nutritional goals?' ){
            return(
              <div className='ContainerC' key = {index}>
                <div className = "QuestionTextC"> {question} </div> 
                <NutritionalInput Handlers = {Handlers[index]} state = {StateArray[index]} label = {labelsArray[index]}  />
              </div>
            )
          }
          else if(QuestionsArray[index] === 'Positive notes about day?' || 'Negative notes about day?' ){
            return(
              <div className='ContainerC' key = {index}>
                <div className = "QuestionTextC"> {question} </div> 
                <textarea className="Input" value={StateArray[index]} onChange={Handlers[index]} rows="3"  />
              </div>
            )
          }
          else {
            return(
              <div key = {index}> Error </div>)
            }
        })}
    </div>
  )
}
export default Questions