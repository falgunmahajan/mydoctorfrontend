import * as React from 'react';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';

import { Outlet, useNavigate } from 'react-router-dom';
import { drawerWidth } from '../App';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Collapse, IconButton } from '@mui/material';
import { AccountCircle, BubbleChart, Close, EventNote, Lock, Person, PersonOutlined} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../Redux/Store';



interface Props {
 
  window?: () => Window;
  mobileOpen:boolean;
  handleDrawerToggle:()=>void;
}
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }));
  const currenturl = window.location.pathname;
  console.log(currenturl);
export default function Sidebar(props: Props) {
    const theme=useTheme()
  const { window,mobileOpen,handleDrawerToggle } = props;
  const navigate = useNavigate();
  const [url, setUrl] = React.useState(currenturl);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = React.useState(
    url === "/myprofile" ||
      url === "/changepassword" ||
      url === "/doctorprofile" ||
      url === "/qualifications" ||
      url === "/experience"||
      url==="/professionalinformation"
  );

  const handleClick = () => {
    setOpen(true);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Toolbar />
      <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
      <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
      {(!user || user.user.role !== "doctor") && (
        <>
          <List>
            <ListItem
              onClick={() => {
                navigate("/");
                setUrl("/");
                setOpen(false);
              }}
              disablePadding
            >
              <ListItemButton
                sx={{ backgroundColor: url === "/" ? "silver" : "transparent" }}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Doctors" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={() => {
                navigate("/specialities");
                setUrl("/specialities");
                setOpen(false);
              }}
              disablePadding
            >
              <ListItemButton
                sx={{
                  backgroundColor:
                    url === "/specialities" ? "silver" : "transparent",
                }}
              >
                <ListItemIcon>
                  <BubbleChart />
                </ListItemIcon>
                <ListItemText primary="Specialities" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
      {user && user.user.role == "patient" && (
        <>
          <List>
            <ListItem
              onClick={() => {
                navigate("/myappointments");
                setUrl("/myappointments");
                setOpen(false);
              }}
              disablePadding
            >
              <ListItemButton
                sx={{
                  backgroundColor:
                    url === "/myappointments" ? "silver" : "transparent",
                }}
              >
                <ListItemIcon>
                  <EventNote />
                </ListItemIcon>
                <ListItemText primary="My Appointments" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={() => {
                navigate("/myprofile");
                setUrl("/myprofile");
                handleClick();
              }}
              disablePadding
            >
              <ListItemButton sx={{ backgroundColor: "transparent" }}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  disableGutters
                  onClick={() => {
                    navigate("/myprofile");
                    setUrl("/myprofile");
                  }}
                  sx={{
                    pl: 8,
                    backgroundColor:
                      url === "/myprofile" ? "silver" : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItemButton>
                <ListItemButton
                  disableGutters
                  onClick={() => {
                    navigate("/changepassword");
                    setUrl("/changepassword");
                  }}
                  sx={{
                    pl: 8,
                    backgroundColor:
                      url === "/changepassword" ? "silver" : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </>
      )}
      {user && user.user.role == "doctor" && (
        <>
          <List>
            <ListItem
              onClick={() => {
                navigate("/doctordashboard");
                setUrl("/doctordashboard");
                setOpen(false);
              }}
              disablePadding
            >
              <ListItemButton
                sx={{
                  backgroundColor:
                    url === "/doctordashboard" ? "silver" : "transparent",
                }}
              >
                <ListItemIcon>
                  <PersonOutlined />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={() => {
                navigate("/doctorprofile");
                setUrl("/doctorprofile");
                handleClick();
              }}
              disablePadding
            >
              <ListItemButton sx={{ backgroundColor: "transparent" }}>
                <ListItemIcon>
                  <PersonOutlined />
                </ListItemIcon>
                <ListItemText primary="Doctor Profile" />
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  disableGutters
                  onClick={() => {
                    navigate("/doctorprofile");
                    setUrl("/doctorprofile");
                  }}
                  sx={{
                    pl: 8,
                    backgroundColor:
                      url === "/doctorprofile" ? "silver" : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Personal Information" />
                </ListItemButton>
                <ListItemButton
                  disableGutters
                  onClick={() => {
                    navigate("/professionalinformation");
                    setUrl("/professionalinformation");
                  }}
                  sx={{
                    pl: 8,
                    backgroundColor:
                      url === "/professionalinformation" ? "silver" : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Professional Information" />
                </ListItemButton>
                <ListItemButton
                  disableGutters
                  onClick={() => {
                    navigate("/qualifications");
                    setUrl("/qualifications");
                  }}
                  sx={{
                    pl: 8,
                    backgroundColor:
                      url === "/qualifications" ? "silver" : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Qualifications" />
                </ListItemButton>
                <ListItemButton
                  disableGutters
                  onClick={() => {
                    navigate("/experience");
                    setUrl("/experience");
                  }}
                  sx={{
                    pl: 8,
                    backgroundColor:
                      url === "/experience" ? "silver" : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Experience" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <List>
            <ListItem
              onClick={() => {
                navigate("/doctorappointments");
                setUrl("/doctorappointments");
                setOpen(false);
              }}
              disablePadding
            >
              <ListItemButton
                sx={{
                  backgroundColor:
                    url === "/doctorappointments" ? "silver" : "transparent",
                }}
              >
                <ListItemIcon>
                  <PersonOutlined />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={() => {
                navigate("/");
                setUrl("/");
                setOpen(false);
              }}
              disablePadding
            >
              <ListItemButton
                sx={{ backgroundColor: url === "/" ? "silver" : "transparent" }}
              >
                <ListItemIcon>
                  <PersonOutlined />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2,
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
          }}
        >
              <DrawerHeader>
          <IconButton onClick={handleDrawerToggle} sx={{color:"black"}}>
          <Close/>
          </IconButton>
        </DrawerHeader>
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
        sx={{ flexGrow: 1, p: 3,backgroundColor: "#fafafa", width: { sm: `calc(100vw - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Toolbar />
       <Outlet/> 
      </Box>
    </Box>
  );
}