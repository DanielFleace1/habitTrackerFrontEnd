import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import photo from '../images/graph2.jpeg';
import pencilImg from '../images/pencil.png'
import noteBookImg from '../images/notebook.png'
import rocketImg from '../images/rocket.png'

import "../styling/HomePage.css" 

const HomePage = () => {
    // HomePage State
    const [displayMenu,setDisplayMenu] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    // HomePage Variables
    const breakpoint = 1120; 
    // HomePage Handlers
    const handleMenuBtn = () => setDisplayMenu(!displayMenu)

    const refreshToTop = () => {
        // Refresh when clicking on title
        window.refresh()
    }

    const handleGetStartedClick = () => {
        console.log('ur mom')
    }

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
        let components = document.querySelectorAll('.navBarTopTitle, .navBarTopFill2, .hpm1Container') 
        
        const handleMenuOutsideClick = (e) =>{
            if(displayMenu) {
                setDisplayMenu(false)
            }
        }
        components.forEach(comp=>{
            comp.addEventListener('click',handleMenuOutsideClick)
        })
    },[displayMenu])  

    return(
        <div className="homePageParent">
            <div className= "navBarContainer">
                {/* Top of Nav Bar */}
                {
                    width > breakpoint ?
                    <nav className="navBarTop">
                        <Link to = "/" onClick={refreshToTop} className="navBarTopTitle" > Habits </Link>
                        <div className="navBarTopFill"> </div> 
                        <Link to = "/SignIn" className="navBarTopInfo" >Sign In </Link>
                        <a href="#howItWorks" className="navBarTopInfo">About App</a>
                        <a href="#aboutDev" className="navBarTopInfo">About Developer</a>
                        {/* <Link to = "/AboutApp" className="navBarTopInfo" >About App </Link> */}
                        {/* <Link to = "/AboutDev" className="navBarTopInfo" >About Devloper </Link> */}
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
            <div className="hpm1Container"> 
                <div className="hmp1TopText">Create Customizable Habits to Track Personal Productivity</div>   
               {/* <button className='getStartedButton' onClick={handleGetStartedClick}> Sign Up! </button> */}
                    <Link to = "/SignUp" className="getStartedButton"> Sign Up !</Link>
               <img src = {photo} id="hpImage"/>
                <div className="hmp1BtmText">  "You do not rise to the level of your goals. You fall to the level of your systems."<br/>-James Clear, Atomic Habits </div> 
            </div>
            <div id="howItWorks">
                <div className="hpm2TopText"> Here's how it works! </div>
                <div className="hmp2flex">
                    <div className="hpm2infoContainer">
                        <div className="hpm2infoHeader"> 1.) Set it up!</div>
                        <div className="hpm2infoText"> Create the habits you wish to track and select a customizable tracking metric.</div>
                        <img src = {pencilImg} id="hpm2pen"/>
                    </div>
                    <div className="hpm2infoContainer">
                        <div className="hpm2infoHeader"> 2.) Track your Data!</div>
                        <div className="hpm2infoText"> Come back to record your data each day! If you forget you can go back and record for any day!</div>
                        <img src = {noteBookImg} id="hpm2notebook"/>
                    </div>
                    <div className="hpm2infoContainer">
                        <div className="hpm2infoHeader"> 3.) View your progress!</div>
                        <div className="hpm2infoText">  Select a data range to view your data and see your progress!. </div>
                        <img src = {rocketImg} id="hpm2rocket"/>
                    </div>               
                </div>
            </div>
            <div id="aboutDev">
                <div className="hpm3Header"> 
                    About Developer!
                </div>
                <div className="hpm3top">
                Hi I'm Daniel, <br/><br/>
                Self taught software engineer & web developer. Previously a process engineer!
                <br/><br/>
                I made this project to display my skill set as a developer & replace my google sheet that I currently use to track my personal habits!
                <br/><br/>
                Checkout my <a className="links" href="https://github.com/DanielFleace1/habitTrackerBackEnd">github</a> to see the repo of this project or  click on my <a className="links" href="https://github.com/DanielFleace1/">homepage</a>   to see more about my programming!
               
                <br/><br/>
                I'm currently looking for a job as a full stack developer! Contact me on <a className="links" href="https://www.linkedin.com/in/danielfleace/">LinkedIN</a> or by email: <div style={{color:'rgb(11, 179, 235)', display: 'inline'}}> danielfleace15@gmail.com </div>! 
               {/* <br></br><br></br>
                I'm currently looking for a full time  job!
                Checkout my github to see the repo and more about my programming or my linkedIN to contact me!  */}
                </div>
            </div>


            
                
       

        </div>
    )
}
export default HomePage


// next step 
// Style nav bar



// other 
// refresh menu in smaller view     
