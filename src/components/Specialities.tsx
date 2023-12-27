import React, { useEffect, useState } from 'react'
import { getSpecialities } from '../utils/getSpecialities';
import { Typography } from '@mui/material';
type SpecialitiesProps={
    length:number
}
interface Specialities{
  name:string,
  imageUrl:string
}

const Specialities = (props:SpecialitiesProps) => {
    const [specialities,setSpecialities]=useState([] as Specialities[] )
    async function getSpecialitiesdata(){
        const speciality = await getSpecialities();
        console.log(speciality)
        setSpecialities(speciality);
    }
    useEffect(()=>{
      getSpecialitiesdata()
    },[])
  return (
    <div>
        {specialities && (
        <Typography
          variant="h4"
          component="div"
          color="#3f51b5"
          fontWeight="Bold"
          sx={{ mt: 3, mx: 3 }}
        >
          {specialities.length}+ Specialities
        </Typography>
      )}
    </div>
  )
}

export default Specialities
