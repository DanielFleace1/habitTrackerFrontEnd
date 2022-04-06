import React from "react"
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import App from'./App'
import Homepage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import App from "./pages/App"
import EnterData  from "./pages/EnterData"
import ManageHabits from "./pages/ManageHabits"
import ViewData from "./pages/ViewData"
import NoPage from "./pages/NoPage"




ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>  
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Homepage" element={<Homepage/>}></Route>
          <Route path="SignUp" element={<SignUp />}></Route>
          <Route path="SignIn" element={<SignIn />}></Route>
          <Route path="App" element={<App />}>
            <Route index element={<EnterData />} />
            <Route path="EnterData" element={<EnterData/>} />
            <Route path="ViewData" element={<ViewData/>} />
            <Route path="ManageHabits" element={<ManageHabits/>} />
          </Route>
          <Route path="*" element={<NoPage/>}/>  
        </Routes>
        
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
