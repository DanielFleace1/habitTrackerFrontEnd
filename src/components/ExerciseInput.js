import '../App.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ExerciseInput = ({Handlers,state,label}) => {
 let exerciseOptions = ['Weight Lifting','Cardio','Yoga', 'Scheduled off', 'Missed']
  return(
    <div className='Input'>
      <FormControl fullWidth>
        <InputLabel >{label}</InputLabel>
        <Select value={state} label={label} onChange={Handlers}>
        {exerciseOptions.map((elm,index)=> {
          return(
            <MenuItem key ={index} value={elm}>{elm} </MenuItem>
          )
        })}
        </Select>
      </FormControl>
    </div>
    )
  }
export default ExerciseInput