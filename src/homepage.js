import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import HomePagePhoto from "./components/HomePageImg";
import "./App.css";

const Homepage = () => {
  const [dropDown, setDropDown] =useState(false)
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 800;
  
  useEffect(() => {
    console.log('inner width effect ')
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  },[]);

  return( 
    <div>
      <div className="homePageParent"> 
      {/* { */}
      {/* // width > breakpoint ?      */}
      <nav  className="HomePageNavBar">
        <Link to = "/" className="HomePageNavBarTitle" >Habits </Link>
        <div className="NavBarFill"></div>
        <Link to = "/SignIn" className="HomePageNavBarInfo" >SignIn </Link>
        <Link to = "/AboutApp" className="HomePageNavBarInfo" >About App </Link>
        <Link to = "/AboutDev" className="HomePageNavBarInfo" >About Devloper </Link>
      </nav>
      {/* :  */}
      {/* // the button */}
      {/* <nav  className="HomePageNavBar">
        <Link to = "/" className="HomePageNavBarTitle" >Habits </Link>
        <div className="NavBarFill2"></div>
        <button className="dropDownBtn" onClick={()=>{setDropDown(!dropDown)}}> ☰ </button>
      </nav>        */}
      {/* // }
      //  {dropDown &&  */}
      {/* //   <div className="dropDownMenuContainer">
      //   <Link to = "/SignIn" className="HomePageNavBarInfo" >SignIn </Link>
      //   <Link to = "/AboutApp" className="HomePageNavBarInfo" >About App </Link>
      //   <Link to = "/AboutDev" className="HomePageNavBarInfo" >About Devloper </Link>
      //   </div>
      // } */}
     
      {/* <div className="homePageMain"></div>
      <div className="homePageMain"></div>  */}
      </div>
    </div>
    )
  }
    
export default Homepage




