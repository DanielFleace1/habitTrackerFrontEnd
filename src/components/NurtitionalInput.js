import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const NutritionalInput = ({Handlers,state,label}) => {
  let nutritionalInput = ['Yes','No'] 
  return(
    <div className='Input'>
      <FormControl fullWidth>
        <InputLabel >{label}</InputLabel>
          <Select value={state} label={label} onChange={Handlers}>
            {nutritionalInput.map((elm,index) => {
              return(<MenuItem key = {index} value = {elm}>{elm}</MenuItem>)
            })}
          </Select>
      </FormControl>
    </div>
    )
}
export default NutritionalInput