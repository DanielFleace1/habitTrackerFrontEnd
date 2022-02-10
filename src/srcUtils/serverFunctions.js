import axios from 'axios'
//Front End URL
const baseURL = 'http://localhost:3001/stats'
//BackEnd URL
//const baseURL = 'http://localhost:3001/'
// Heroku// production build
//const baseURL = '/'
let token = null
const setToken = (newToken) =>{
  token = (`bearer ${newToken}`)
}
// Get Data Logged In
const getAll =  async () => {
  const config = {
    headers:{ Authorization: token},
  }
  const res = await axios.get(`${baseURL}api/data`,config)
  return res.data
}
// Create New Entry 
const create = async (newObj) => {
  const config = {
    headers:{ Authorization: token},
  }
  const response = await axios.post(`${baseURL}api/data`,newObj,config)
  return response.data
}
// Edit Data for logged in user 
const update = (id,newObj) =>{
    return axios.put(`${baseURL}api/data/${id}`,newObj)
}
// Remove Data 
const remove = (id) => {
  return axios.delete(`${baseURL}api/data/${id}`)
}
// Login in
const login = async (credentials) => {
  const response = await axios.post(`${baseURL}api/login`,credentials)
  return response.data
}
export default {
  create,update,remove, login, setToken,getAll,
}