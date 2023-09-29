import React, { useEffect, useState } from 'react'
import dashboard from "../svg/dashboard.svg"
import { Box, Card, CardContent, Grid,  Typography } from '@mui/material'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
 const [speciality,setSpeciality]=useState()
 const[loading,setLoading]=useState(true)
const navigate= useNavigate();
useEffect(()=>{
 ( async()=>{
    const res=await axios.get("http://localhost:4000/specializations?$limit=100&$sort[name]=1")
    setSpeciality(res.data.data)
    setLoading(false)
})();
},[])

console.log(speciality)
  return (
    <>
      <div style={{marginTop:"100px"}} >
        <img src={dashboard} alt="image not found" />
      </div>
     {speciality && <Typography variant="h4" component="div" color="#3f51b5" fontWeight="Bold" sx={{ mt: 3, mx: 3 }}>
        {speciality.length}+ Specialities
      </Typography>}
      <Grid container spacing={2} sx={{pl:3}} >
        {speciality? speciality.slice(0,6).map((item,index)=>{
                return( <Grid item key={index} xs={12}   lg={4} sx={{mt:3}}>
                <Card sx={{ width:390 , height:200 , border:1, borderColor:"divider" }}>
                    <CardContent sx={{ textAlign: "center" }}>
                      <img src={`http://localhost:4000/${item.imageUrl}`} alt="img not found" width="30%" />
                      <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                        {item.name}
                      </Typography>
                    </CardContent>
                </Card>
              </Grid>)
        }):<ClipLoader
        loading={loading}
        size={150}
        cssOverride={{margin:"auto"}}/>
      }
      </Grid>
      {speciality  && <Box sx={{display:"flex", justifyContent:"end", pr:2}}>
      <Typography onClick={()=>navigate("/specialities")} fontSize={18} underline='none' sx={{cursor:"context-menu"}} >View all Specialities...</Typography>
      </Box>}
    </>
  )
}
