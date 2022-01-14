import { format, set,formatDistance,subDays, isYesterday } from 'date-fns'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import setDate from 'date-fns/setDate';
import { el } from 'date-fns/locale';

const checkEntry = (array, value) => {
  return array.findIndex(element => {
    console.log('element',element)
    console.log('value',value)
    return element.Date ===  value
  }
  )
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
      return (a > b )
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
