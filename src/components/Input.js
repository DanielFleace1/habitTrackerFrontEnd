import '../App.css'

const Input = ({Handlers,state}) => {
 // console.log(state)
    return(
  
      <input onChange={Handlers} value={state}   className = "InputC" />
    )
  }

export default Input