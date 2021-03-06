import { useState } from "react"
import { useOutletContext } from "react-router-dom";
import '../styling/ViewData.css';

const ViewData = () => {

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    //  Use Local Storage So that a Users Date Selection will Persist Throughout Their Current Login in Session on the App.
    let storedDates = window.localStorage.getItem('storedDates');
    if(!storedDates){
        const storedDatesObj = {
            startDate: formatDate(new Date()),
            endDate:  formatDate(new Date())
        }
        window.localStorage.setItem('storedDates', JSON.stringify(storedDatesObj)) 
        storedDates = window.localStorage.getItem('storedDates')
    }
    const startingDates = JSON.parse(storedDates)

    // State & initial Values
    const [values] = useOutletContext();
    const [dates,setDates] = useState(startingDates);
    // Handlers 
    // Handle to Date Change
    const handleDateChange = (e) => {
        const {name,value} = e.target
        setDates({
            ...dates,
            [name]:value
        })
        let newStoredDates = JSON.parse(storedDates);
        newStoredDates[name] = value;
        window.localStorage.setItem('storedDates', JSON.stringify(newStoredDates)) 
    }

    // Create Dates Column  
    let getDaysArray = function(start, end) {
        let arr = []
        for(const date=new Date(end); date>=new Date(start); date.setDate(date.getDate()-1)){
          arr.push(date.toISOString().slice(0, 10));
        }
        return arr;
    };
    let columnDates = getDaysArray(dates.startDate,dates.endDate)  


    const {startDate,endDate} = dates
    return(
        <div className="viewDataParent">
            <div className="viewDataDateConatiner">
                <div className = "viewDateDataHeadings"> Start: </div>
                 <input name = 'startDate'className ="viewDateDateInput" onChange={handleDateChange} value={startDate} type={'date'}/>       
                <div className = "viewDateDataHeadings"> End: </div>
                <input name = 'endDate' className ="viewDateDateInput" onChange={handleDateChange} value={endDate} type={'date'}/>       
            </div>
            <div className="viewDataMain">
                <div className="viewDataDatesColumn" >
                    <div className="viewDataDatesTitle">Dates</div>
                    <div className="viewDatesDatesAry">
                        {columnDates.map((elm,index) => {
                            return(
                                <div className="viewDatesDatesAryValues" key = {index}>{elm}</div>
                        )})}
                    </div>
                </div>
                <div className="viewDataDataContainer"> 
                    {/* Title */}
                    <div className="viewDataDataTitleContainer">
                        {values.HabitAry.map(index => {
                            return(
                                <div key ={index._id} className="viewDataDataTitles"> {index.habitName} </div>
                        )})}
                    </div>
                    {/* Data */}
                    <div className="viewDataDataTable">
                        {values.HabitAry.map( index => {
                            return(                    
                                <div className="viewDataDataColumns" key = {index._id} >   
                                    {
                                        columnDates.map(dateElm=>{
                                            let counter = 0 
                                            return(
                                                index.habitData.map(habitDataElm =>{
                                                    if(dateElm === habitDataElm.date){
                                                        return(
                                                            <div  key ={habitDataElm._id} className="viewDataDataValues">
                                                                {habitDataElm.value}
                                                            </div>
                                                    )}
                                                    counter++
                                                    if(counter === index.habitData.length){
                                                        return(<div  key ={habitDataElm._id} className="viewDataDataValues"> - </div>)
                                                    }    
                                            }))
                                        })
                                    }          
                                </div>
                        )})}
                    </div>
                </div> 
            </div> 
        </div>
    )
}
export default ViewData    



