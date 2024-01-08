import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { degree, getDoctorSpecialities, getHospitals, getLanguages, getName, getNextAvailableSlots, getQualification, hospital, language, speciality } from '../utils/Doctors'
import { useNavigate } from 'react-router-dom';
interface DoctorCardProps{
  Id:string,
    firstName:string;
    lastName:string;
    Qualification:degree[];
    specialities:speciality[];
    hospitals:hospital[];
    languages:language[]
}
const DoctorsCard = ({
  Id,  firstName,lastName,Qualification,specialities,hospitals,languages
}:DoctorCardProps) => {
  const[nextAvailable,setNextAvailable]=useState<string|null>()
  const navigate=useNavigate();
  useEffect(()=>{
    setAvailableSlots()
  })
  const setAvailableSlots=async()=>{
    const str=await getNextAvailableSlots(Id)
    setNextAvailable(str)
  }
  return (
    <Card
    sx={{
      width:  {xs:300,xl:350},
      height:380,
      border: 1,
      borderColor: "divider",
      p: 1,
    }}
    onClick={()=>navigate(`/doctor/${Id}`)}
  >
    <CardContent sx={{ display: "flex",height:"100%" }}>
      <Avatar
        src="/broken-image.jpg"
        sx={{ width: 70, height: 70, mr: 2 }}
      />
      <Box sx={{height:"100%"  }}>
        <Box  sx={{ height:"95%"  }}>
          <Typography sx={{ fontWeight: "bold" }}>
            {`Dr. ${getName(firstName,lastName)}`}
          </Typography>
          <Typography sx={{fontSize:11, mt: 1, color:"grey" }}>
            {Qualification && getQualification(Qualification)}
          </Typography>
          <Typography sx={{fontSize:11,color:"grey"}}>
            {getDoctorSpecialities(specialities)}
          </Typography>
          <Grid container>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography sx={{ fontSize:11,color:"black" }}>
                Hospital
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography sx={{fontSize:11,color:"grey"}}>
                {hospitals.length
                  ? getHospitals(hospitals)
                  : "Not Available"}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }}>
              <Typography sx={{fontSize:11, color:"black" }}>
                Languages
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }}>
              <Typography sx={{fontSize:11,color:"grey"}}>
                {languages
                  ? getLanguages(languages)
                  : "Not Available"}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography sx={{fontSize:11,color:"black" }}>
                Next Available
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography sx={{fontSize:11,color:nextAvailable==="Not available"?"grey":"green"}}>{nextAvailable}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: "#3f51b5",
              color: "#3f51b5",
              borderRadius: 10,
            }}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>
    </CardContent>
  </Card>
  )
}

export default DoctorsCard
