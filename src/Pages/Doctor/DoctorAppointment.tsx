import { Avatar, Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/Store'
import axios from 'axios'

type appointmentTypes=  
{
    Id: string,
    patientId: string,
    doctorId: string,
    slotId: string,
    appointmentStatus: "notStarted",
    otherName: null|string,
    otherMobileNumber: null|string,
    patient: {
        Id: string,
        user: {
            firstName: string,
            lastName: string,
        }
    },
    slot: {
        Id: string,
        startTime: string,
        endTime: string,
    }
}
const DoctorAppointment = () => {
    const [value,setValue]=useState(10)
    const [appointment,setAppointment] = useState([] as appointmentTypes[])
    const user=useAppSelector(state=>state.userReducer.user)
 
  useEffect(()=>{
  getAppointmentData()
  },[user])
  const getAppointmentData=async()=>{
    try {
        const resp=await axios.get(`http://localhost:4000/appointments?doctorId=${user?.Id}`)
        console.log(resp);
        setAppointment(resp.data)
    } catch (error) {
        
    }
  
    
  }
  console.log(appointment)
  return (
 
   
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
         {!appointment.length ? <Grid item xs={12} sx={{backgroundColor:"white",mt:1}}>
            <Typography sx={{fontSize:15, color:"grey",p:3,textAlign:"center"}}>No appointments are made yet</Typography>
          </Grid>
          :
          appointment.map(item=>(
            <Grid item xs={12} sx={{backgroundColor:"white",mt:2, py:1, px:2, border:1, borderColor:"divider",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
            <Avatar src="/broken-image.jpg"  sx={{ width: 80, height: 80, mr:2 }}/>
            <Typography sx={{fontSize:15, fontWeight:"bold"}}>{item.patient.user.firstName} {item.patient.user.lastName ? item.patient.user.lastName :"self"}</Typography>
            </Box>
            <Box>
                <span><Typography sx={{fontSize:15, color:"#3f51b5"}}>Date</Typography></span>
            </Box>
          </Grid>
          ))
          }
          
    </Grid>
    
  )
}

export default DoctorAppointment
