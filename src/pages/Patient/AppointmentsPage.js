import { QuestionAnswerOutlined } from '@mui/icons-material'
import {  Avatar, Box, Button, FormControl, Grid, MenuItem, Pagination, Select, Typography } from '@mui/material'
import React, { useState } from 'react'

const AppointmentsPage = () => {
    const [value,setValue]=useState(10)
    const [page,setPage]=useState(1)
    let start, end,count
    const handleChange = (event, value) => {
        setPage(value);
      };
      count = Math.ceil(5/value);
      start = (value*page)-(value)
       end=(value*page)
  return (
    <Box sx={{mt:13, minHeight:"66vh"}}>
    <Grid container >
        <Grid item xs={6}>
      <Typography
            variant="h4"
            sx={{ color: "#3f51b5", fontWeight: "bold" }}
          >
            My Appointments
          </Typography>
          </Grid>
          <Grid item xs={6} sx={{textAlign:"right"}}>
            <Typography variant='body4' sx={{fontSize:20, mr:2}}> Number of records</Typography>
           
          <FormControl variant="standard" >
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={(e)=>{
              setValue(e.target.value)
          setPage(1)}}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
          </Grid>
    </Grid>
    <Grid container sx={{border:1, borderColor:"divider", backgroundColor:"white", p:2, mt:4}}>
    <Grid item xs={3} sx={{display:"flex", alignItems:"center"}}>
    <Avatar src="/broken-image.jpg"  sx={{ width: 100, height: 100, mr:3 }}/>
    <Typography sx={{fontSize:"20px"}}>Falgun Mahajan</Typography>
    </Grid>
    <Grid item xs={3} sx={{my:"auto", py:1}}>
        <Box sx={{display:"flex"}}><Typography sx={{color:"#3f51b5",mr:0.5}}>Date:</Typography><Typography>03 Aug 2023</Typography></Box>
    
    <Box sx={{display:"flex"}}><Typography sx={{color:"#3f51b5",mr:0.5}}>Timing:</Typography><Typography>11:00am - 11:30 am</Typography></Box>
    
    </Grid>
    <Grid item xs={3} sx={{my:"auto", py:1, px:"auto"}}>
        <Box sx={{display:"flex"}}><Typography sx={{color:"#3f51b5",mr:0.5}}>Patient:</Typography><Typography>Self</Typography></Box>
    
    <Box sx={{display:"flex", alignItems:"center"}}><Typography sx={{color:"#3f51b5",mr:0.5}}>Status:</Typography><Button variant="contained" sx={{borderRadius:15}}>Not Started</Button></Box>
    
    </Grid>
    <Grid item xs={3} sx={{my:"auto",textAlign:"right"}}>
    <Button variant="outlined" sx={{borderColor:"#3f51b5",color:"#3f51b5"}}><QuestionAnswerOutlined/>Consult</Button>
    </Grid>
    </Grid>
    {count && <Pagination variant="outlined" count={count} page={page} color="primary" onChange={handleChange} sx={{display:"flex" ,justifyContent:"center",mt:3}} />}
    </Box>
  )
}

export default AppointmentsPage
