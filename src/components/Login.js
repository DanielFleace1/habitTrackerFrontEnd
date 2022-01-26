import React from "react";
import '../App.css';
const Login = ({handleUserSubmit,handleUserChange,handlePassChange,username,password, user, handleLogout}) => {
  
  if(user === null){
  return(
    <form  onSubmit={handleUserSubmit}>
    <div>Enter Username: <input value = {username} onChange={handleUserChange}/></div>
    <div>Enter Password: <input value = {password} onChange={handlePassChange}/></div>
    <div><button  type="submit">Submit</button></div>
  </form>
  )
  } 
  
  else{
    return(
      <div>
        {user.username} is logged in 
        <br/>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

}

export default Login