import React from "react";

const Title = ({date,handleDateChange}) => {
  return(
    <div className="TitleC">
        <div>
          Habit Tracker App
        </div>
        <div>
           Enter the date to be edited <input onChange = {handleDateChange} value = {date} />
        </div>
    </div>
  )
}

export default Title

{/* <input onChange={Handlers} value={state}   className = "InputC" /> */}