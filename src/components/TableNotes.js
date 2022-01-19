import { format, isYesterday, set } from 'date-fns'
import helperFns from '../srcUtils/helperFns';

const TableNotes =  ({AppData}) => {
    const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
    const formatYesterday = format(yesterday,'yyyy/MM/dd')
    let index = helperFns.checkEntry(AppData,formatYesterday)
    

    if(index > -1){
    return(
        <div>   
        <div className='notesTableTitle'>Yesterday's Notes</div>
        <div className='notesParent'>
            <div className='posNotes'>{AppData[index].posNotes}</div>
            <div className='negNotes'>{AppData[index].negNotes}</div>
        </div>
        </div>)
    }
    else{
        return(
            <div>
               <div className='notesTableTitle'>No Notes from Yesterday</div>
            </div>
        )
    }
}

export default TableNotes

// steps to solve. if yesterdays date exists. show notes
// get yesterday date in same format its stored in state data
// find the index of where it is. display it 
