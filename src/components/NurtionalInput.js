import '../App.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const NutrionalInput = ({Handlers,state,label}) => {

  let nutrionalInput = ['Yes','No'] 
    return(
      <div className='Input'>
        <FormControl fullWidth>
          <InputLabel >{label}</InputLabel>
            <Select value={state} label={label} onChange={Handlers}>
              {nutrionalInput.map((elm,index) => {
                return(<MenuItem key = {index} value = {elm}>{elm}</MenuItem>)
              })}
            </Select>
        </FormControl>
      </div>
    )
  }
export default NutrionalInput