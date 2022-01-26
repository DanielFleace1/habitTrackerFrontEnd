import axios from 'axios'


//Front End URL
//const baseURL = 'http://localhost:3001/stats'

//BackEnd URL
const baseURL = 'http://localhost:3001/api/data'

let token = null
const setToken = (newToken) =>{
  token = (`bearer ${newToken}`)
}

// Get Data Logged In - DONE
const getAll =  async () => {
  const config = {
    headers:{ Authorization: token},
  }
  const res = await axios.get(baseURL,config)
  return res.data
}

// Create New Entry - DONE
const create = async (newObj) => {
  const config = {
    headers:{ Authorization: token},
  }
  const response = await axios.post(baseURL,newObj,config)
  return response.data
}

// Edit Data for logged in user - DONE
const update = (id,newObj) =>{
    return axios.put(`${baseURL}/${id}`,newObj)
}

// Remove Data - not done
const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}
// Login in - DONE
const login = async (credentials) => {
  const response = await axios.post('http://localhost:3001/api/login',credentials)
  return response.data
}

export default {
  create,update,remove, login, setToken,getAll,
}