const Table = ({AppData,TableArray}) => {

    //whats a better way to do this??
    if(AppData === undefined){
        return(<div></div>)
    }
    else if(AppData){ 
        return (
            <table className="Table">
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
                    <th>Positive Notes</th>
                    <th>Negative Notes</th>

                </tr>
                {AppData.map((stat,index) => {return(
                    <tr key = {index}>
                        {/* {console.log(stat)} */}
                        {TableArray.map((element ,index) => {return(
                            <td key = {index}>
                              {/* {console.log(stat[element])}  */}
                                <button onClick={()=>{console.log('works!')}}>
                                    {/* Question why do i have to use bracket notation here  */}
                                    {stat[element]}
                                </button>
                            </td>)



                         })}
                    </tr>          
                )  
        })}  
        </tbody>
        </table>   
      )
    }  
}

export default Table