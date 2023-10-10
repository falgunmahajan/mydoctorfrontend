import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';






// import Navbar from './Navbar';
import { AccountCircle, BubbleChart, EventNote, ExpandLess, ExpandMore, Lock, Margin, Person, Person2Outlined, Person3Outlined, PersonOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Redux/createSlice';
import Footer from './Footer';

const currenturl=window.location.pathname
console.log(currenturl)
export default function SideBar({handleDrawerToggle,window,drawerWidth,mobileOpen}) {

    const navigate = useNavigate();
    const [url,setUrl]=useState(currenturl)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [open, setOpen] = useState(url==="/myprofile"||url==="/changepassword");

    const handleClick = () => {
      setOpen(true);
    };
   
    const drawer = (
        <div>
          
          <Toolbar />
          <Toolbar />
          <Toolbar sx={{ display: { xs: 'block', md: 'none'} }}/>
          <Toolbar sx= {{ display: { xs: 'block', md: 'none'} }} />
         { user.role!=="doctor" &&<><List>
              <ListItem onClick={()=>{
                    navigate("/");
                    setUrl("/")
                    setOpen(false)
                  }} disablePadding>
                <ListItemButton  sx={{backgroundColor:(url==="/") ? "silver":"transparent"}}>
                  <ListItemIcon>
                    <Person/>
                  </ListItemIcon>
                  <ListItemText primary="Doctors"  />
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem onClick={()=>{
                    navigate("/specialities")
                    setUrl("/specialities")
                    setOpen(false)
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:(url==="/specialities") ? "silver":"transparent"}}>
                  <ListItemIcon>
                    <BubbleChart/>
                  </ListItemIcon>
                  <ListItemText primary="Specialities" />
                </ListItemButton>
              </ListItem>
          </List></>}
          {user.role=="patient" && <>
          <List>
              <ListItem onClick={()=>{
                    navigate("/myappointments")
                    setUrl("/myappointments")
                    setOpen(false)
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:(url==="/myappointments") ? "silver":"transparent"}}>
                  <ListItemIcon>
                    <EventNote/>
                  </ListItemIcon>
                  <ListItemText primary="My Appointments" />
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem onClick={()=>{
                    navigate("/myprofile")
                    setUrl("/myprofile")
                    handleClick()
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:"transparent"}}>
                  <ListItemIcon>
                    <Person/>
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />

                </ListItemButton>
                
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding   >
        <ListItemButton disableGutters onClick={()=>{
                    navigate("/myprofile")
                    setUrl("/myprofile")
                    }} sx={{ pl: 8 ,backgroundColor:(url==="/myprofile") ? "silver":"transparent"}}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
          <ListItemButton disableGutters onClick={()=>{
                    navigate("/changepassword")
                    setUrl("/changepassword")
                    }} sx={{ pl: 8 ,backgroundColor:(url==="/changepassword") ? "silver":"transparent"}}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
        </List>
      </Collapse>
          </List></>}
          {user.role=="doctor" && <>
          <List>
              <ListItem onClick={()=>{
                    navigate("/specialities")
                    setUrl("/specialities")
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:(url==="/specialities") ? "silver":"transparent"}}>
                  <ListItemIcon>
                    <PersonOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem onClick={()=>{
                    navigate("/specialities")
                    setUrl("/specialities")
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:(url==="/specialities") ? "silver":"transparent"}}>
                  <ListItemIcon>
                  <PersonOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="Doctor Profile" />
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem onClick={()=>{
                    navigate("/specialities")
                    setUrl("/specialities")
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:(url==="/specialities") ? "silver":"transparent"}}>
                  <ListItemIcon>
                  <PersonOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="Appointments" />
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem onClick={()=>{
                    navigate("/specialities")
                    setUrl("/specialities")
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:(url==="/specialities") ? "silver":"transparent"}}>
                  <ListItemIcon>
                  <PersonOutlined/>
                  </ListItemIcon>
                  <ListItemText primary="Reviews" />
                </ListItemButton>
              </ListItem>
          </List></>}
        </div>
      );
    
      const container = window !== undefined ? () => window().document.body : undefined;
    
      return (
        <>
        <Box sx={{ display: 'flex'}}>
          <Box
            component="nav" 
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, marginTop:"100px" }}
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Outlet/>
          </Box>
        </Box>
        </>
  )
}
