
// get
useEffect(() => {
    axios
      .get('http://localhost:3001/stats')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data[0].Sleep)
      })
  }, [])



  // const handleTableChange = (a,b) => {
  //   //     //console.log('a.date is', a.Date)
  //   //     //console.log('b is', b)
  //   //     let c = prompt(`Change ${b} on ${a.Date} to what?`) 
  //   //     //console.log('c is', c)
  //   //     if(c){
  //   //         //console.log('truthy')
  //   //          let index = helperFns.checkEntry(AppData,a.Date)
  //   //          //console.log('index',index)
  //   //          let newobject = clone(AppData[index])
  //   //          console.log('new object',newobject)
  //   //          console.log('appdata before', AppData[index])
  //   //          newobject[b] = c 
  //   //          console.log('updated object', newobject)
  //   //          console.log('appdata after', AppData[index])
  //   //          setAppData(AppData.map(stat => stat.Date !== newobject.Date ? stat : newobject.Date))
  //   //          //serverFunctions.update(AppData[stat].id,)
  //   //     }
  //   //     else {
  //   //         console.log('falsy')
  //   //     }
    
  //    }