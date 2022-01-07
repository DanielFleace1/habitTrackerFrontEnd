
const FormatDate= () => {
  return new Date().toISOString().slice(0, 10);
}

const checkEntry = (array, value) => {
  return array.findIndex(element => element.Date === value)
}

    


export default{
     FormatDate,
     checkEntry,
}
