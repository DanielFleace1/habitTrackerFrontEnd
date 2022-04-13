import axios from 'axios'
//BackEnd URL
// const baseURL = 'http://localhost:3001/'
// Heroku production build
const baseURL = '/'

// Login in
const login = async (credentials) => {
  const response = await axios.post(`${baseURL}api/login`,credentials)
  return response.data
}
// Sign Up
const signUp = async(newObj) => {
  const response = await axios.post (`${baseURL}api/signup`,newObj)
  return response.data
}
// Upon user Sign Up, Create New Habit Document
const createHabitDocument = async (userIdObj,token) =>{
  const config = {
    headers:{ Authorization: 'bearer '+ token},
  }
  const response = await axios.post(`${baseURL}api/habits`,userIdObj,config)
  return response.data; 
}
// Add new Habit (Ex. x hours of sleep) to Habit Ary in Habit Document  
const addNewHabit = async (newHabitObj,habitId,token) =>{
  const config = {
    headers:{ Authorization: 'bearer '+token},
  }
  const response = await axios.put(`${baseURL}api/habits/${habitId}`,newHabitObj,config)
  return response.data; 
}
// Get Logged in Users Habit Ary
const getUserHabitDocument = async(habitId,token) =>{
  const config = {
    headers:{ Authorization: 'bearer '+ token},
  }
  const response = await axios.get(`${baseURL}api/habits/${habitId}`,config);
  return response.data;
}
// Add data to Users  Habits (Ex. x hours of sleep) in Habit Ary in  Habit Document
const addToHabitData = async (newHabitData,habitId,token) =>{
  const config = {
    headers:{ Authorization: 'bearer '+ token},
  }
  const res = await axios.put(`${baseURL}api/habits/${habitId}`,newHabitData,config)
  return res.data
}
// Delete Individual Habit (Ex. x hours of sleep) in Habit Ary 
const deleteHabitFromHabitAry = async (habitAryIdObj,habitId,token) => {
  const res = await axios.delete(`${baseURL}api/habits/${habitId}`,{ data: { habitAryIdObj},headers: { "Authorization": 'bearer '+ token } });
  return res.data
}

export default {
 login,signUp, createHabitDocument,addNewHabit, getUserHabitDocument,addToHabitData,deleteHabitFromHabitAry
}

