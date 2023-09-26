import React from 'react'

// import Login from '../components/Login'
import { Box, Grid, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
// import login from "../login.svg";
// import registration from "../final registration.svg"
// import DoctorSignUp from '../components/DoctorSignUp'
import { Link } from 'react-router-dom'
import PatientSignUp from '../pages/PatientSignUp'
export default function TabPage() {
    const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container sx={{my:25}}>
  <Grid item xs={0} lg={5} sx={{mx:"auto"}}>
    {/* {value=="/auth/login"?<img src={login} alt="image not found" />:<img src={registration} alt="image not found" />} */}
    
  </Grid>
  <Grid item xs={11} lg={4} sx={{mx:"auto"}}>
  <TabContext value={value}>
        <Box sx={{ border: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="LOGIN"  value="/auth/login" component={Link} to="/auth/login" sx={{ width:"33%"}}/>
            <Tab label="PATIENT SIGN UP"  value="/auth/signup" component={Link}  to="/auth/signup" sx={{borderLeft:1,borderColor: 'divider', width:"33%"}}/>
            <Tab label="DOCTOR SIGN UP" value="/auth/doctor-register" component={Link} to="/auth/doctor-register"  sx={{borderLeft:1,borderColor: 'divider',width:"33%"}}/>
          </TabList>
        </Box>
        <Box sx={{ border: 1, borderColor: 'divider', mt:2, px:4}}>
        {/* <TabPanel value="/auth/login"><Login/></TabPanel> */}
        <TabPanel value="/auth/signup"><PatientSignUp/></TabPanel>
        {/* <TabPanel value="/auth/doctor-register"><DoctorSignUp/></TabPanel> */}
        </Box>
      </TabContext>
      
  </Grid>
  </Grid>
      
  )
}
