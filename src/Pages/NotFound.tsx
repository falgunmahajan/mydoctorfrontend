import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import notFound from "../svg/404 page error.svg"
import { Link } from 'react-router-dom'
const style={
    textDecoration:"none",
    fontSize:20,
    marginBottom:"10px"
}
const NotFound = () => {
  return (
   <Grid container sx={{mt:30}}>
    <Grid item xs={9} lg={3}   order={{ xs: 2, lg: 1 }} sx={{ px:6, m:{xs:"auto",lg:"20px 0 0 auto"}}}>
<Typography variant='h2' sx={{mb:2}}>OOPS!</Typography>
<Typography variant='h5' sx={{mb:5}}>We can't seem to find the page
you are looking for.</Typography>
<Typography variant='h5'sx={{mb:5}}>Here are some helpful links instead:</Typography>
<Box sx={{display:"flex" , flexDirection:"column", mb:5}}>
<Link style={style} to="/">Doctors</Link>
<Link style={style} to="/auth/login">Login/SignUp</Link>
</Box>
    </Grid>
    <Grid item xs={9} lg={4} order={{ xs: 1,lg: 2 }}  sx={{m:{xs:"auto", lg:"0 auto 0 0"}}}>
        <img src={notFound}/>
        </Grid>
   </Grid>
  )
}

export default NotFound
