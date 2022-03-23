import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import  TextField  from '@mui/material/TextField';
import { Box } from '@mui/system';
import  Select  from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';

import DialogContentText from '@mui/material/DialogContentText';



function NewHabitMUIdialog ({handleHabitDialog, openHabitDialog})  {
    
    return(
        <div>
            
            <Dialog autoFocus maxWidth={'md'} fullWidth={true} open={openHabitDialog} onClose={handleHabitDialog}>
                
                <form onSubmit={()=>console.log('submit')}>
                <DialogTitle sx={{textAlign:'center'}}>
                    Create new Habit!   
                </DialogTitle>
                <br/>
                <Box sx={{width: '80%', marginLeft:'2vw'}}>
                    <TextField sx={{  }} autoFocus margin="normal" id="habitPrompt"  label="Create a prompt for new habit." type="text" fullWidth />
                </Box>
                <br/>

               {/*
               <Select labelId="demo-simple-select-label" id="demo-simple-select" value={0} label="Age" onChange={()=>{console.log('yeah')}}>
                    <MenuItem value={10}>Number</MenuItem>
                    <MenuItem value={20}> 0-10 </MenuItem>
                    <MenuItem value={30}>Text </MenuItem>
                </Select>
                <br/>
                <button type='submit'> submit </button> */}
                </form>

            </Dialog>

        </div>
    )
}

export default NewHabitMUIdialog
