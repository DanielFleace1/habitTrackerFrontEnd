import helperFns from '../srcUtils/helperFns'
const clone = require('rfdc')()


const Table = ({AppData,TableArray}) => {


    const handleTableChange = (a,b) => {
       //console.log(a.Date)
       //console.log(b)
       let c = prompt(`Change ${b} on ${a.Date} to what?`) 
       
       

    }

    //whats a better way to do this??
    if(AppData === undefined){
        return(<div></div>)
    }
    else if(AppData){ 
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
                    <th>Date</th>
                    <th>Sleep</th>
                    <th>Work</th>
                    <th>Exercise</th>
                    <th>Nutrional Goals</th>
                    <th>Work Rating</th>
                    <th>Health  Rating</th>
                    <th>Overall Rating</th>
                    {/* <th>Positive Notes</th>
                    <th>Negative Notes</th> */}
                </tr>
                {filteredADC.map((stat,index) => {return(
                    
                    <tr key = {index}>
                        {/* {console.log(stat)} */}
                        {TableArray.map((element ,index2) => {
                            if(element !== 'posNotes' && element !== 'negNotes'){
                                return(

                                    <td key = {index2}>
                                     
                                        <button className='tableButton' onClick={()=>handleTableChange(stat,element)}>
                                            
                                            {stat[element]}
                                        </button>
                                    </td>)
                            }

                         })}
                    </tr>        
                )  
        })}  
        </tbody>
        </table>  
        </div> 
      )
    }  
}

export default Table