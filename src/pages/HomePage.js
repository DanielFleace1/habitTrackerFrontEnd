import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import "../styling/HomePage.css" 

const HomePage = () => {
    // HomePage State
    const [displayMenu,setDisplayMenu] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    // HomePage Variables
    const breakpoint = 800; 
    // HomePage Handlers
    const handleMenuBtn = () => setDisplayMenu(!displayMenu)
    
    // HomePage Effects
    useEffect(() => {
        // effect to set up event listner to: handle window resize => UI component (nav bar info) needs to be changed with width 
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    },[]);
    useEffect(() => {
        // effect to handle closing menu when width becomes > breakpoint
        if(width>breakpoint){ setDisplayMenu(false)}
    })
    useEffect(() => {
        // effect to set up and evenlistner to: handle a click outside of the drop down menu. will close the menu
        let components = document.querySelectorAll('.navBarTopFill2 , .testHomePageMain1')

        const handleMenuOutsideClick = (e) =>{
            if(displayMenu) {
                setDisplayMenu(false)
            }
        }
        components.forEach(comp=>{
            comp.addEventListener('click',handleMenuOutsideClick)
        })
    },[])

    return(
        <div className="homePageParent">
            <div className= "navBarContainer">
                {/* Top of Nav Bar */}
                {
                    width > breakpoint ?
                    <nav className="navBarTop">
                        <Link to = "/" className="navBarTopTitle" >Habits </Link>
                        <div className="navBarTopFill"></div> 
                        <Link to = "/SignIn" className="navBarTopInfo" >SignIn </Link>
                        <Link to = "/AboutApp" className="navBarTopInfo" >About App </Link>
                        <Link to = "/AboutDev" className="navBarTopInfo" >About Devloper </Link>
                    </nav>
                    :
                    <nav className="navBarTop">
                        <Link to = "/" className="navBarTopTitle" >Habits </Link>
                        <div className="navBarTopFill2"></div>
                        <button className="navBarTopBtn" onClick={handleMenuBtn}> ☰</button>
                    </nav>
                }
                {/* Btm Nav Bar */}
                {
                    displayMenu && breakpoint > width &&
                    <div className="navBarBtm"> 
                        <Link to = "/SignIn" className="navBarBtmInfo" >SignIn </Link>
                        <Link to = "/AboutApp" className="navBarBtmInfo" >About App </Link>
                        <Link to = "/AboutDev" className="navBarBtmInfo" >About Devloper </Link>
                    </div>
                }   
            </div>

            {/*  to be delete (all beetween) divs for testing stick */}
            <div className="testHomePageMain1"> </div>
            <div className="testHomePageMain1"> </div>
            {/*  delete all between */}
        </div>
    )
}
export default HomePage


// next step 
// Style nav bar



// other 
// refresh menu in smaller view     
