import { Card, CardContent, Grid, MenuItem, Pagination, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { Search } from '@mui/icons-material'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
export default function Specialities() {
    const [value,setValue]=useState(16)
    const [page,setPage]=useState(1)
    const [speciality,setSpeciality]=useState()
     const[loading,setLoading]=useState(true)
     const inputRef = useRef("");
     let start, end,count
    const handleChange = (event, value) => {
        setPage(value);
        // console.log(page)
      };
      useEffect(()=>{
        (async()=>{
        const res=await axios.get("http://localhost:4000/specializations?limit=100")
        setSpeciality(res.data.data)
        setLoading(false)
      })();
    },[])
    // console.log(speciality)
    if(speciality){
         count = Math.ceil(speciality.length/value);
        start = (value*page)-(value)
         end=(value*page)
    }
    const searchSpeciality=async ()=>
    {
      console.log("something")
          const res = await axios.get(`http://localhost:4000/specializations?limit=100&name=${inputRef.current.value}`);
          setSpeciality(res.data.data);
          // inputRef.current.value=""
    }
    console.log(speciality)
    let specialityGrid;
    if(speciality)
    {
      if(speciality.length)
      {
         specialityGrid= speciality.slice(start,end).map((item,index)=>{
          return( <Grid item key={index} xs={12}  lg={3} sx={{mb:3}}>
          <Card sx={{ width:390 , height:200 , border:1, borderColor:"divider" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <img src={`http://my-doctors.net/${item.imageUrl}`} alt="img not found" width="30%" />
                <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                  {item.name}
                </Typography>
              </CardContent>
          </Card>
        </Grid>)
      })
    }
      else{
        specialityGrid =  (<div style={{textAlign:"center", width:"100%", marginTop:"10px"}}>No specialities found</div>)
      }
      
    }
      else{
        specialityGrid=  <ClipLoader
         loading={loading}
         size={150}
         cssOverride={{margin:"auto"}}/>
      }
  
   
  return (
    <div>
        <Grid container spacing={2} sx={{pl:3, mt:10, mb:3, justifyContent:"space-between"}}>
          {speciality &&  <Grid item xs={12} md={4}>
      <Typography variant="h4" component="div" color="#3f51b5" fontWeight="Bold">
        {speciality.length}+ Specialities
      </Typography>
      </Grid>}
      <Grid item xs={12} md={4} sx={{display:"flex"}}>
      <TextField sx={{mr:1}}
      onKeyDown={e=>{
        if(e.key==="Enter")
    {
      searchSpeciality();
        
    }}}
     
  variant="outlined" 
  placeholder="Search Specialities"
  inputRef={inputRef}
  InputProps={{
    endAdornment: <Search sx={{cursor:"context-menu"}} onClick={searchSpeciality} />, 
  }}
/>
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={value}
    // label="Age"
    onChange={(e)=>{
        setValue(e.target.value)
    setPage(1)}
    }
  >
    <MenuItem value={8} >8</MenuItem>
    <MenuItem value={12}>12</MenuItem>
    <MenuItem value={16}>16</MenuItem>
    <MenuItem value={20}>20</MenuItem>
    <MenuItem value={40}>40</MenuItem>
  </Select>
      </Grid>
      </Grid>
      <Grid container spacing={2} sx={{pl:3}} >
       {specialityGrid}
      </Grid>
      {count>1 && <Pagination count={count} page={page} onChange={handleChange} sx={{display:"flex" ,justifyContent:"center"}} />}
      
    </div>
  )

}
