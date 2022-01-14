import { format, isYesterday, set } from 'date-fns'

const TableNotes =  ({AppData}) => {
//console.log(AppData[0].Sleep)
    return(
        <div>   
        <div className='notesTableTitle'>Todays Notes</div>
        <div className='notesParent'>

            <div className='posNotes'>{AppData[0].posNotes}</div>
            <div className='negNotes'>{AppData[0].negNotes}</div>
        </div>
        </div>)
}

export default TableNotes