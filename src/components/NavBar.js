import '../styling/NavBar.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
// Material UI Imports
import { Dialog, DialogTitle,Menu,MenuItem } from '@mui/material'

const NavBar =  ({LoggedUser}) => {
    // State & initial Values
    const [howToOpen, setHowToOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [logoutDialog,setLogoutDialog] = useState(false)
    
    const logoutMenuOpen = Boolean(menuAnchorEl);

    const navigate = useNavigate();
    
    //Handler Functions
    const handleClose = (e) => {
        setHowToOpen(false);
        setContactOpen(false);
        setMenuAnchorEl(null);
        setLogoutDialog(false);
    }

    const handleBtn = (e) => {
        // Handle Clicks on logout, how to use, contact dev logout
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
                <Link className='appNavBarLinks' to = "EnterData">Enter Habit</Link>
                <Link className='appNavBarLinks' to = "ViewData">View Habit</Link> 
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
                    [write here]
                </div>
            </Dialog>
           
            <Dialog sx={{display:'flex',alignItems:'center',justifyContent:'center'}} autoFocus fullWidth onClose={handleClose} open={contactOpen}>
                <DialogTitle sx={{textAlign:'center'}}> Contact Developer </DialogTitle>
                <div className='contactDevDialogParent'>
                    [write here]
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

