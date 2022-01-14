
import { format, isYesterday, set } from 'date-fns'
import helperFns from '../srcUtils/helperFns'
import TableNotes from './TableNotes'
const clone = require('rfdc')()

const Table = ({AppData,TableArray,handleTableChange}) => {
    //whats a better way to do this??
    if(AppData === undefined){
        return(<div></div>)
    }
    else if(AppData ){ 
        // wrangle data
        let AppDataClone = clone(AppData)
        let filteredADC = helperFns.displayfilter(AppDataClone)
        filteredADC.sort(helperFns.sortByDate);
        filteredADC.reverse();        
        // end data wrangle 
        return (
            <div className="table">
                <div className='tableTitle'>Last 7 days</div>
            <table >
                <tbody>
                <tr>
                    <th>Date</th><th>Sleep</th><th>Work</th><th>Exercise</th><th>Nutrional Goals</th><th>Work Rating</th><th>Health  Rating</th><th>Overall Rating</th>
                </tr>
                {filteredADC.map((stat,index) => {return(
                    <tr key = {index}>
                        {/* {console.log(stat)} */}
                        {TableArray.map((element ,index2) => {
                            if(element !== 'posNotes' && element !== 'negNotes'){
                                return(
                                    <td key = {index2}>
                                        {/* <button className='tableButton' onClick={()=>handleTableChange(stat,element)}> */}
                                        {/* button is commented out. i was going to allow user to directly change on the button but decided i will come back if necessary */}
                                            <div className='tableButton'>{stat[element]}</div>
                                        {/* </button> */}
                                    </td>)
                            }
                         })}
                    </tr>        
                )  
                })}  
                </tbody>
            </table>  
       <TableNotes AppData={AppData}/>
        </div> 
        ) 
    }  
}

export default Table