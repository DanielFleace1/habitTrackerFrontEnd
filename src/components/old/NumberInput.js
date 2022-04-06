import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const NumberInput = ({Handlers,state,label}) => {
  let numbersValue = [1,2,3,4,5,6,7,8,9,10]
  let numberText = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'] 
  return(
    <div className='Input'>
      <FormControl fullWidth>
        <InputLabel >{label}</InputLabel>
          <Select value={state} label={label} onChange={Handlers}>
            {numbersValue.map((elm,index) => {
              return( <MenuItem key = {index} value = {elm}> {numberText[index]}</MenuItem> )
            })}
          </Select>
      </FormControl>
     </div>
  )
}
export default NumberInput