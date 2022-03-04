import React from "react"
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import App from'./App'
import Homepage from "./pages/HomePage";
import Signin from "./pages/Signup";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>  
        <Routes>
          <Route path="/" element={<Homepage />}> </Route>
          <Route path="/SignIn" element={<Signin />}> </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
