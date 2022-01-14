import axios from 'axios'


//Front End URL
//const baseURL = 'http://localhost:3001/stats'

//BackEnd URL
const baseURL = 'http://localhost:3001/api/data'


// Create New Entry 
const create = (newObj) => {
  return axios.post(baseURL,newObj)
}

const update = (id,newObj) =>{
    return axios.put(`${baseURL}/${id}`,newObj)
}

export default {

  create,
  update,

}