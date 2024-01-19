import  { useEffect, useState } from "react";
import dashboard from "../svg/dashboard.svg";

import { SpecialitiesTypes, getSpecialities } from "../utils/getSpecialities";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { Link} from "react-router-dom";
import SpecialitiesCard from "../components/SpecialitiesCard";
import { DoctorsTypes, getDoctors, slotTypes } from "../utils/Doctors";
import DoctorsCard from "../components/DoctorsCard";
import axios from "axios";
import { useAppSelector } from "../Redux/Store";
import Footer from "../components/Footer";
const Dashboard = () => {
  const [specialities, setSpecialities] = useState([] as SpecialitiesTypes[]);
  const [doctors, setDoctors] = useState([] as DoctorsTypes[]);
  const [loading, setLoading] = useState(true);
  const [page,setPage]=useState(1)
  
  const user = useAppSelector((state) => state.userReducer.user);
  let start:number=0;
  let end:number=0;
  let count:number=0
  async function getSpecialitiesdata() {
    const speciality = await getSpecialities();
    console.log(speciality);
    setSpecialities(speciality);
    
  }
  async function getDoctorsdata() {
    const doctors = await getDoctors();
    setDoctors(doctors);
    
  }
  
  
 
  useEffect(() => {
    getSpecialitiesdata();
    getDoctorsdata()
    setLoading(false)

  }, [user]);
  if(doctors.length){
    count = Math.ceil(doctors.length/12);
   start = (12*page)-(12)
    end=(12*page)
}

  return (
    <>
      <img src={dashboard} alt="image not found" />
      {specialities.length ? (
        <>
          <Typography
            variant="h4"
            component="div"
            color="#3f51b5"
            fontWeight="Bold"
            sx={{ mt: 3, mx: 3 }}
          >
            {specialities.length >10? specialities.length-(specialities.length%10):specialities.length}+ Specialities
          </Typography>

          <Grid container spacing={2} sx={{ pl: 3 }}>
            {specialities.slice(0, 8).map((item, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ mb: 2 }}>
                  <SpecialitiesCard
                    speciality={item.name}
                    imageUrl={item.imageUrl}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", pr: 2 }}>
            <Link
              to="/specialities"
              style={{
                cursor: "context-menu",
                fontSize: 18,
                textDecoration: "none",
                color: "black",
              }}
            >
              View all specialities
            </Link>
          </Box>
        </>
      ) : (
        <Grid container>
          <ClipLoader
            loading={loading}
            size={50}
            color="blue"
            cssOverride={{ margin: "auto" }}
          />
        </Grid>
      )}
      <Typography
          component="div"
          sx={{ mt: 2, mx: 3 }}
        >
          {doctors.length>10? doctors.length-(doctors.length%10):doctors.length}+ Doctors
        </Typography>
       <Grid container spacing={2} sx={{ pl: 3 }}>
        {doctors.length ? (
          
          doctors.slice(start, end).map((doctor, index) => {
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
          })
        
        ) : (
          <ClipLoader
            loading={loading}
            size={150}
            cssOverride={{ margin: "auto" }}
          />
        )}
        <Grid item xs={12}>
        {doctors.length && <Pagination count={count} page={page} onChange={(event, value) =>setPage(value)} sx={{display:"flex" ,justifyContent:"center"}} />}</Grid>
      </Grid>
     
    </>
  );
};

export default Dashboard;
