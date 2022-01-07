
// get
useEffect(() => {
    axios
      .get('http://localhost:3001/stats')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data[0].Sleep)
      })
  }, [])