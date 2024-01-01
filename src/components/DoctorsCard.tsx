import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { degree, getDoctorSpecialities, getHospitals, getLanguages, getName, getQualification, hospital, language, speciality } from '../utils/Doctors'
interface DoctorCardProps{
    firstName:string;
    lastName:string;
    Qualification:degree[];
    specialities:speciality[];
    hospitals:hospital[];
    languages:language[]
}
const DoctorsCard = ({
    firstName,lastName,Qualification,specialities,hospitals,languages
}:DoctorCardProps) => {
  return (
    <Card
    sx={{
      width:  {xs:300,xl:350},
      height:350,
      border: 1,
      borderColor: "divider",
      p: 1,
      pr:2
    }}
  >
    <CardContent sx={{ display: "flex",height:"100%" }}>
      <Avatar
        src="/broken-image.jpg"
        sx={{ width: 80, height: 80, mr: 3 }}
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
              <Typography sx={{fontSize:11,color:"grey"}}>Not Available</Typography>
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
