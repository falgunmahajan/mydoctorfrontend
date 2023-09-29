import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';






// import Navbar from './Navbar';
import { BubbleChart, Margin, Person } from '@mui/icons-material';

const currenturl=window.location.pathname
export default function SideBar({handleDrawerToggle,window,drawerWidth,mobileOpen}) {

    const navigate = useNavigate();
    const [url,setUrl]=useState(currenturl)

 
    const drawer = (
        <div>
          
          <Toolbar />
          <Toolbar />
          <Toolbar sx={{ display: { xs: 'block', md: 'none'} }}/>
          <Toolbar sx= {{ display: { xs: 'block', md: 'none'} }} />
          <List>
              <ListItem onClick={()=>{
                    navigate("/");
                    setUrl("/")
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
                    }} disablePadding>
                <ListItemButton sx={{backgroundColor:(url==="/specialities") ? "silver":"transparent"}}>
                  <ListItemIcon>
                    <BubbleChart/>
                  </ListItemIcon>
                  <ListItemText primary="Specialities" />
                </ListItemButton>
              </ListItem>
          </List>
        </div>
      );
    
      const container = window !== undefined ? () => window().document.body : undefined;
    
      return (
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
  )
}
