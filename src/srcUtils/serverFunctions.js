import axios from 'axios'

const baseURL = 'http://localhost:3001/Stats'


// Create New Entry 
const create = (newObj) => {
  return axios.post(baseURL,newObj)
}

const update = (id,newObj) =>{
    return axios.put(`${baseURL}/${id}`,newObj)
}


export default{
    create,
    update,
}