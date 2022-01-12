import '../App.css'
import NumberPicker from "react-widgets/NumberPicker";

const Input = ({Handlers,state}) => {
 // console.log(state)
    return(
      <div>
      {/* //<input onChange={Handlers} value={state}   className = "InputC" /> */}
      <NumberPicker />
      </div>
    )
  }

export default Input