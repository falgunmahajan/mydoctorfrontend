import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DoctorsTypes } from '../utils/Doctors'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { Box, FormControl, Grid, MenuItem, Pagination, Select, Typography } from '@mui/material'
import DoctorsCard from '../components/DoctorsCard'

const Search = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const speciality=searchParams.get("sp")
    const name=searchParams.get("q")
    const [doctors,setDoctors]=useState<DoctorsTypes[]|null>()
    const [loading,setLoading]=useState(true)
    const [value,setValue]=useState(12)
    const [page,setPage]=useState(1)
    let start:number=0;
    let end:number=0;
    let count:number=0
   
    if(doctors?.length){
        count = Math.ceil(doctors.length / value);
    start = value * page - value;
    end = value * page;
    }
    useEffect(()=>{
getDoctorsData()
    },[])
    const getDoctorsData=async()=>{
        let resp;
        if(speciality){
          resp=await axios.get(`http://localhost:4000/doctors?speciality=${speciality}`)
        }
        if(name){
             resp=await axios.get(`http://localhost:4000/doctors?name=${name}`)
        }
        if(resp){
            setDoctors(resp.data)
            setLoading(false)
        }
        
    }
  return (
    <div>
      {!doctors ?
      <Box sx={{mt:2, display:"flex",justifyContent:"space=between"}}>
 <ClipLoader
            loading={loading}
            size={22}
            color="#3f51b5"
            cssOverride={{ marginLeft:2}}
          />
             <Typography sx={{ml:2}}>Searching For: '{speciality||name}'</Typography>
      </Box>
   :  !doctors.length?

   <Typography sx={{ml:1,mt:2,color:"grey"}}>No results found for '{speciality||name}'</Typography>
   :
   <>
<Box sx={{display:"flex", justifyContent:"space-between"}}>
    <Box>
    <Typography sx={{fontSize:18,mb:1}}>Showing results for : '{speciality||name}'</Typography>
    <Typography sx={{color:"grey",mb:1}}>{doctors.length} doctors found</Typography>
    </Box>
    <Box sx={{width:100}}>
    <Typography sx={{fontSize:11,color:"grey"}}>
Items per page
</Typography>
           
           <FormControl  fullWidth variant="standard" >
         <Select
        
           labelId="demo-simple-select-standard-label"
           id="demo-simple-select-standard"
           value={value}
           onChange={(e)=>{
               setValue(Number(e.target.value))
           }}
         >
           <MenuItem value={9}>19</MenuItem>
           <MenuItem value={12}>12</MenuItem>
           <MenuItem value={18}>18</MenuItem>
           <MenuItem value={30}>30</MenuItem>
         </Select>
       </FormControl>
    </Box>
</Box>
<Grid container >
{doctors.slice(start, end).map((doctor, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={4}  xl={3} sx={{ mb: 2 }}>
               <DoctorsCard
               Id={doctor.Id}
                firstName={doctor.user.firstName}
                lastName={doctor.user.lastName}
                Qualification={doctor.Qualification}
                specialities={doctor.specialities}
                hospitals={doctor.hospitals}
                languages={doctor.languages}
/>
              </Grid>
            );
          })}
</Grid>
{count > 1 && (
        <Pagination
          count={count}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      )}
</>
      }
     
    </div>
  )
}

export default Search
