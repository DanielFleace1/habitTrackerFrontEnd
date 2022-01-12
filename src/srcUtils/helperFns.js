
const FormatDate= () => {
  return new Date().toISOString().slice(0, 10);
}

const checkEntry = (array, value) => {
  return array.findIndex(element => element.Date === value)
}

// sort app data in ascending order 
const sortByDate = (c,d) =>{
  let a = c.Date.split('-').join('')
  let b = d.Date.split('-').join('')
  return a-b
}     

// Used in Table.js - filter out last 7 days for display 
const displayfilter = (arry) => {
  return( 
    arry.filter((obj) => {
      let a = obj.Date.split('-').join('');
      let b = FormatDate();
          b = b.split('-').join('')-7;
      return (a > b )
    })
  )
}

export default{
     
     checkEntry,
     sortByDate,
     displayfilter,   
}
