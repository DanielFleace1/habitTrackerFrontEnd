import '../styling/NavBar.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Dialog, DialogTitle,Menu,MenuItem } from '@mui/material'

const NavBar =  ({LoggedUser}) => {
    // State & Initial Values
    const [howToOpen, setHowToOpen] = useState(false); // Open "How to Use this App" MUI Dialog
    const [contactOpen, setContactOpen] = useState(false); // Open "Contact Dev" MUI Dialog
    const [menuAnchorEl, setMenuAnchorEl] = useState(null); // Anchor Menu
    const [logoutDialog,setLogoutDialog] = useState(false); // Open "Logout" MUI Dialog
    const logoutMenuOpen = Boolean(menuAnchorEl); // Show Logout Menu 
    // React Router - Navigate 
    const navigate = useNavigate();
    
    //Handler Functions
    const handleClose = (e) => {
        // Handle Close of Dialogs
        setHowToOpen(false);
        setContactOpen(false);
        setMenuAnchorEl(null);
        setLogoutDialog(false);
    }
    const handleBtn = (e) => {
        // Handle Clicks on Logout, How to Use, Contact Dev, Logout Btns
        if(e.target.id === 'profileBtn'){
            setMenuAnchorEl(e.currentTarget);
        }
        if(e.target.id === 'profileLogoutMenu'){
            setLogoutDialog(true)
        }
        if(e.target.id === 'howToOpen'){
            setHowToOpen(true)
        }
        if(e.target.id === 'contactOpen'){
            setContactOpen(true)
        }
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/SignIn')
    }

    return(     
        <div className="navBarParent"> 
            <button  id ="profileBtn" className='nbUser' onClick={handleBtn} >
                {LoggedUser} 
            </button>
            <Menu id="basic-menu" anchorEl={menuAnchorEl} open = {logoutMenuOpen} onClose={handleClose}> 
                <MenuItem id = "profileLogoutMenu" sx={{ fontSize:'14px'}}   onClick={handleBtn}>Logout</MenuItem>
            </Menu>
            <nav className ="nbLinksContainer">
            <div className='appNavBarLinksTitle'> Navigate App </div>
                <Link className='appNavBarLinks' to = "EnterData">Enter Habist</Link>
                <Link className='appNavBarLinks' to = "ViewData">View Habits</Link> 
                <Link className='appNavBarLinks' to = "ManageHabits"> Manage Habits</Link> 
            </nav>
            <div className='appNavBarInfo'>
                <div className='appNavBarInfoTitle' > Information  </div>
                <button id="howToOpen" className='appNavBarInfoBtn'  onClick={handleBtn}> How to use App</button>
                <button id="contactOpen" className='appNavBarInfoBtn' onClick={handleBtn}> Contact Developer</button>
            </div> 

            <Dialog sx={{display:'flex',alignItems:'center',justifyContent:'center'}} autoFocus fullWidth onClose={handleClose} open={howToOpen}>
                <DialogTitle sx={{textAlign:'center'}}> How to use this app </DialogTitle>
                <div className='howToUseDialogParent'>  
                To get started with the app click on “Add Habit ++” in the upper right hand corner. Users will be prompted to name a habit and select a tracking unit. 
                The entered name will  be a prompt  to answer each day on the <i>Enter Habit </i> page. 
                The tracking unit can be a number, Yes or No, scale of 1-10 or a free text field. Here’s an example: Name:”How many hours did I sleep last night?”; Output: “Number”.
                <br/><br/>
                After defining habits, users can navigate to the <i>Enter Habit </i> page to record their habits for the day. You can also enter a habit for any previous/future day. 
                Users can change the date in the input at the top of the page. If a user enters data for a date that has already been entered it will overwrite the previous data. 
                I ( the developer, Daniel)  am working on a feature to alert users before they overwrite their data.
                <br/><br/>
                Users can view their data on the <i> View Habits</i> page. The date inputs at the top of the page allows users to view their historical habit data across any date range. 
                Another feature I am considering adding is  aggregation methods & visualizations  so users can easily view their habits across days, weeks, months, or years in tabular or graphical form. 
                <br/><br/>
                Users can delete a habit and its data by navigating to the  <i> Manage Habits </i> page  and selecting a habit to delete.
                <br/><br/>
                If you're viewing the demo account (access at login screen) feel free to create new habits and add data.
                <br/><br/>
                Thank you for taking the time to use Habits!
                - Daniel

                </div>
            </Dialog>
            <Dialog sx={{display:'flex',alignItems:'center',justifyContent:'center'}} autoFocus fullWidth onClose={handleClose} open={contactOpen}>
                <DialogTitle sx={{textAlign:'center'}}> Contact Developer </DialogTitle>
                <div className='contactDevDialogParent'>
                    
                    Hi I'm Daniel,
                    Thank you for taking the time to check out Habits.
                    <br/><br/>
                    I developed this app to practice my development skills and replace my google sheet that I currently track my habits and routines with!
                    If you have questions, or feedback I'd love to hear it/them!
                    You can reach me via email: Danielfleace15@gmail.com 
                    <br/>
                    or LinkedIN & Github!
                    <br/>
                    <a href="https://www.linkedin.com/in/danielfleace/" rel="noreferrer" target="_blank">-LinkedIn</a>
                    <br/>
                    <a href="https://github.com/DanielFleace1" rel="noreferrer"      target="_blank">-Github</a>
                    <br/><br/>
                    I'm actively searching for a job as a software  developer. My skills are based in Java Script and the MERN stack. Check out my github home page for more about me!<br/> 
                    - Daniel

                </div>
            </Dialog> 
            <Dialog sx={{display:'flex',alignItems:'center',justifyContent:'center'}} autoFocus fullWidth onClose={handleClose} open={logoutDialog}>
                <DialogTitle sx={{textAlign:'center'}}> Logout of Habits?</DialogTitle>
                    <div className='logoutDialogParent'>
                        <button className='logoutDialogButtons' onClick={handleLogout}>Logout</button><br/>
                        <button className='logoutDialogButtons' onClick={handleClose}>cancel</button>
                    </div>
            </Dialog>
        </div>
    )
}
export default NavBar

