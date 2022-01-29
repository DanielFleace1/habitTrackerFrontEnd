import { format, set,formatDistance,subDays, isYesterday } from 'date-fns'
const checkEntry = (arry, value) => {
  return arry.findIndex(element => element.Date ===  value)
}
// sort app data in ascending order 
const sortByDate = (c,d) =>{
  let a = c.Date.split('/').join('')
  let b = d.Date.split('/').join('')
  return a-b
}     
// Used in Table.js - filter out last 7 days for display 
const displayfilter = (arry) => {
  return( 
    arry.filter((obj) => {
      let a = obj.Date.split('/').join('');
      let b = format(new Date, 'yyyy/MM/dd')
          b = b.split('/').join('')-7;
      let c = format(new Date, 'yyyy/MM/dd')
          c = c.split('/').join('');
      return (a > b && a <= c)
    })
  )
}
const dateMinusNum = (date,num) => {
  let a = date.split('/').join('') - num
  const b = a.push('3')
  return b
}
export default{
     checkEntry,
     sortByDate,
     displayfilter,
     dateMinusNum,   
}
