import React from "react";

const Title = ({date}) => {
  return(
    <div className="TitleC">
        <div>
          Habit Tracker App
        </div>
        <div>
           Enter the date to be edited <input value = {date}/>
        </div>
    </div>
  )
}

export default Title