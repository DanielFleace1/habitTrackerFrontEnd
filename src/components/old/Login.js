const Login = ({handleUserSubmit,handleUserChange,handlePassChange,username,password, user, handleLogout}) => {
  
  if(user === null){
  return(
    <form  onSubmit={handleUserSubmit}>
    <div style={{ fontFamily:"'Courier New', Courier, monospace" }} >Enter Username:<input className="userNameinput" value = {username} onChange={handleUserChange}/></div>
    <div style={{ fontFamily:"'Courier New', Courier, monospace" }}>Enter Password:<input className="passwordinput" value = {password} onChange={handlePassChange}/></div>
    <div><button className="userSubmitButton"  type="submit">Submit</button></div>
  </form>
  )
  } 
  else{
    return(
      <div style={{ fontFamily:"'Courier New', Courier, monospace",marginTop:"8%" }} >
        {user.username} is logged in 
        <br/>
        <button className="userLogoutButton" onClick={handleLogout}>Logout</button>
      </div>
    )
  }
}

export default Login