import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'

const PatientAppointment = () => {
    const [value,setValue]=useState(10)
   
  
  return (
    <div>
        <Grid container >
        <Grid item xs={6}>
      <Typography
            sx={{ color: "#3f51b5", fontWeight: "bold",fontSize:28 }}
          >
            My Appointments
          </Typography>
          </Grid>
          <Grid item xs={6} >
            <Box sx={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
            <Typography sx={{fontSize:15,color:"grey",mr:1}}> Number of records</Typography>
           
           <FormControl variant="standard" >
         <Select
           labelId="demo-simple-select-standard-label"
           id="demo-simple-select-standard"
           value={value}
           onChange={(e)=>{
               setValue(Number(e.target.value))
        
     }
     }
         >
           <MenuItem value={10}>10</MenuItem>
           <MenuItem value={20}>20</MenuItem>
           <MenuItem value={30}>30</MenuItem>
         </Select>
       </FormControl>
            </Box>
        
          </Grid>
          <Grid item xs={12} sx={{backgroundColor:"white",mt:1}}>
            <Typography sx={{fontSize:15, color:"grey",p:3,textAlign:"center"}}>No appointments are made yet</Typography>
          </Grid>
    </Grid>
    </div>
  )
}

export default PatientAppointment