import React from 'react'

import { Box, Grid, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import login from "../svg/login.svg";
import registration from "../svg/final registration.svg"
import { Link } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
export default function TabPage() {
    const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container sx={{my:25,backgroundColor:"#fafafa",py:5}}>
 <Grid item xs={0} lg={5} sx={{mx:"auto"}}>
    {/* {value=="/auth/login"?<img src={login} alt="image not found" />:<img src={registration} alt="image not found" />} */}
    
  </Grid>
  
  <TabContext value={value}>
  <Grid item xs={11} lg={4} sx={{mx:"auto"}}>
        <Box sx={{ border: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="LOGIN"  value="/auth/login" component={Link} to="/auth/login" sx={{ width:"20%"}}/>
            <Tab label="PATIENT SIGN UP"  value="/auth/signup" component={Link}  to="/auth/signup" sx={{borderLeft:1,borderColor: 'divider', width:"25%"}}/>
            <Tab label="DOCTOR SIGN UP" value="/auth/doctor-register" component={Link} to="/auth/doctor-register"  sx={{borderLeft:1,borderColor: 'divider',width:"28%"}}/>
            <Tab label="HOSPITAL SIGN UP" value="/auth/hospital-signup" component={Link} to="/auth/hospital-signup"  sx={{borderLeft:1,borderColor: 'divider',width:"27%"}}/>
          </TabList>
        </Box>
        </Grid>
        <Grid item xs={0} lg={5} sx={{mx:"auto"}} >
    {value=="/auth/login"?<img src={login} alt="image not found" />:<img src={registration} alt="image not found" />}
    
  </Grid>
  <Grid item xs={11} lg={4} sx={{mx:"auto"}}>
        <Box sx={{ border: 1, borderColor: 'divider', mt:2, px:4,backgroundColor:"white"}}>
        <TabPanel value="/auth/login"><Login/></TabPanel>
        <TabPanel value="/auth/signup"><SignUp role="patient"/></TabPanel>
        <TabPanel value="/auth/doctor-register"><SignUp role="doctor"/></TabPanel>
        <TabPanel value="/auth/hospital-signup"><SignUp role="hospital"/></TabPanel>
        </Box>
        </Grid>
      </TabContext>
      
 

  </Grid>
      
  )
}
