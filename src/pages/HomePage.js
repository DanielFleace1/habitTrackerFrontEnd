import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import photo from '../images/graph2.jpeg';
import pencilImg from '../images/pencil.png'
import noteBookImg from '../images/notebook.png'
import rocketImg from '../images/rocket.png'

import "../styling/HomePage.css" 

const HomePage = () => {
    // State & Variables
    const [displayMenu,setDisplayMenu] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1120;

    // HomePage Handlers
    const handleMenuBtn = () => setDisplayMenu(!displayMenu) // Expand Hamburger Menu

    const refreshToTop = () => {
        // Refresh when clicking on title
        window.refresh()
    }
    
    // HomePage Effects
    useEffect(() => {
        // Effect to set up Event Listner to: Handle Window Resize => UI component (Nav Bar Info) needs to be Changed with Width 
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    });
    useEffect(() => {
        // Effect to Handle Closing Menu when Width Becomes > Breakpoint
        if(width>breakpoint){ setDisplayMenu(false)}
    },[width])
    useEffect(() => {
        // Set up and Event Listner to: Handle a Click Outside of the Drop Down menu to close Menu
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
                {
                    width > breakpoint ?
                    <nav className="navBarTop">
                        <Link to = "/" onClick={refreshToTop} className="navBarTopTitle" > Habits </Link>
                        <div className="navBarTopFill"> </div> 
                        <Link to = "/SignIn" className="navBarTopInfo" >Sign In </Link>
                        <a href="#howItWorks" className="navBarTopInfo">About App</a>
                        <a href="#aboutDev" className="navBarTopInfo">About Developer</a>
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
                        <a href="#howItWorks" className="navBarBtmInfo" >About App </a>
                        <a href="#aboutDev" className="navBarBtmInfo" >About Devloper </a>
                    </div>
                }   
            </div>
            <div className="hpm1Container"> 
                <div className="hmp1TopText">Create Customizable Habits to Track Personal Productivity</div>   
                    <Link to = "/SignUp" className="getStartedButton"> Sign Up !</Link>
               <img src = {photo} id="hpImage" alt="Graph with Positive Slope"/>
                <div className="hmp1BtmText">  "You do not rise to the level of your goals. You fall to the level of your systems."<br/>-James Clear, Atomic Habits </div> 
            </div>
            <div id="howItWorks">
                <div className="hpm2TopText"> Here's how it works! </div>
                <div className="hmp2flex">
                    <div className="hpm2infoContainer">
                        <div className="hpm2infoHeader"> 1.) Set it up!</div>
                        <div className="hpm2infoText"> Create the habits you wish to track and select a customizable tracking metric.</div>
                        <img src = {pencilImg} id="hpm2pen" alt="Pencil"/>
                    </div>
                    <div className="hpm2infoContainer">
                        <div className="hpm2infoHeader"> 2.) Track your Data!</div>
                        <div className="hpm2infoText"> Come back to record your data each day! If you forget you can go back and record for any day!</div>
                        <img src = {noteBookImg} id="hpm2notebook" alt="NoteBook"/>
                    </div>
                    <div className="hpm2infoContainer">
                        <div className="hpm2infoHeader"> 3.) View your progress!</div>
                        <div className="hpm2infoText">  Select a data range to view your data and see your progress!. </div>
                        <img src = {rocketImg} id="hpm2rocket" alt="Rocket"/>
                    </div>               
                </div>
            </div>
            <div id="aboutDev">
                <div className="hpm3Header"> 
                    About Developer!
                </div>
                <div className="hpm3top">
                Hi I'm Daniel, <br/><br/>
                Self taught software engineer & web developer. Previously a manufacturing  process engineer!
                <br/><br/>
                I made this project to display my skill set as a developer & replace my google sheet that I currently use to track my personal habits!
                <br/><br/>
                Checkout my <a className="links" href="https://github.com/DanielFleace1/habitTrackerBackEnd">github</a> to see the repo of this project or  click on my <a className="links" href="https://github.com/DanielFleace1/">homepage</a>   to see more about my programming!
               
                <br/><br/>
                I'm currently looking for a job as a full stack developer! Contact me on <a className="links" href="https://www.linkedin.com/in/danielfleace/">LinkedIN</a> or by email: <div style={{color:'rgb(11, 179, 235)', display: 'inline'}}> danielfleace15@gmail.com </div>! 
                </div>
            </div>
        </div>
    )
}
export default HomePage

   
