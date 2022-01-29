import helperFns from '../srcUtils/helperFns'
import TableNotes from './TableNotes'
import EditDelete from './EditDelete'
const clone = require('rfdc')()

const Table = ({AppData,TableArray,handleTableChange,setAppData, deleteDate, handleDeleteDateChange, handleDeleteSubmit, openDeleteDia, handleClickOpen,handleClose}) => {
    if(AppData === undefined){
        return(<div></div>)
    }
    else if(AppData ){ 
        let AppDataClone = clone(AppData)
        let filteredADC = helperFns.displayfilter(AppDataClone)
        filteredADC.sort(helperFns.sortByDate);
        filteredADC.reverse();        
        return (
            <div className="table">
                <div className='tableTitle'>Last 7 days</div> 
                <div className='smallTableDiv'>
                    <table >
                        <tbody>
                        <tr>
                            <th>Date</th><th>Sleep</th><th>Work</th><th>Exercise</th><th>Nutritional Goals</th><th>Work Rating</th><th>Health  Rating</th><th>Overall Rating</th>
                        </tr>
                        {filteredADC.map((stat,index) => {return(
                            <tr key = {index}>
                                {TableArray.map((element ,index2) => {
                                    if(element !== 'posNotes' && element !== 'negNotes'){
                                        return(
                                            <td key = {index2}>                            
                                                <div className='tableButton'>{stat[element]}</div>                                                
                                            </td>
                                        )
                                    }
                                })}
                            </tr>        
                        )  
                        })}  
                        </tbody>
                    </table>  
                </div>
                <TableNotes AppData={AppData}/>
                <EditDelete  AppData = {AppData} setAppData ={setAppData} deleteDate ={deleteDate} handleDeleteDateChange = {handleDeleteDateChange} handleDeleteSubmit = {handleDeleteSubmit} openDeleteDia = {openDeleteDia} handleClickOpen = {handleClickOpen} handleClose = {handleClose} />
            </div> 
        ) 
    }  
}
export default Table