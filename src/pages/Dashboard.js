import React, { useEffect, useState } from "react";
import dashboard from "../svg/dashboard.svg";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [speciality, setSpeciality] = useState();
  const [doctors, setDoctors] = useState();
  const [loading, setLoading] = useState(true);
  const [page,setPage]=useState(1)
  const navigate = useNavigate();
  let start, end,count
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "http://localhost:4000/specializations?limit=100"
      );
      setSpeciality(res.data.data);
      const resp = await axios.get("http://localhost:4000/doctors");
      setDoctors(resp.data);
      setLoading(false);
    })();
  }, []);
  if(doctors){
    count = Math.ceil(doctors.length/12);
   start = (12*page)-(12)
    end=(12*page)
}
  const getName = (firstName, lastName) => {
    if (lastName) {
      return `${firstName} ${lastName}`;
    }
    return firstName;
  };
  console.log(speciality);
  const getQualification = (Qualification) => {
    const doctorQualification = Qualification.map((item) => item.degree).join(
      " | "
    );
    return doctorQualification;
  };
  const getSpecialities = (specialities) => {
    const doctorSpecialities = specialities
      .map((item) => item.name)
      .join(" | ");
    return doctorSpecialities;
  };
  const getHospitals = (hospitals) => {
    const doctorHospitals = hospitals
      .map((item) => item.hospitalName)
      .join(" | ");
    return doctorHospitals;
  };
  const getLanguages = (languages) => {
    const doctorLanguages = languages.map((item) => item.name).join(", ");
    return doctorLanguages;
  };
  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <div style={{ marginTop: "100px" }}>
        <img src={dashboard} alt="image not found" />
      </div>
      {speciality && (
        <Typography
          variant="h4"
          component="div"
          color="#3f51b5"
          fontWeight="Bold"
          sx={{ mt: 3, mx: 3 }}
        >
          {speciality.length}+ Specialities
        </Typography>
      )}
      <Grid container spacing={2} sx={{ pl: 3 }}>
        {speciality ? (
          speciality.slice(0, 6).map((item, index) => {
            return (
              <Grid item key={index} xs={12} lg={4} sx={{ mt: 3 }}>
                <Card
                  sx={{
                    width: 390,
                    height: 200,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <img
                      src={`http://localhost:4000/${item.imageUrl}`}
                      alt="img not found"
                      width="30%"
                    />
                    <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
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
      </Grid>
      {speciality && (
        <Box sx={{ display: "flex", justifyContent: "end", pr: 2 }}>
          <Typography
            onClick={() => navigate("/specialities")}
            fontSize={18}
            underline="none"
            sx={{ cursor: "context-menu" }}
          >
            View all Specialities...
          </Typography>
        </Box>
      )}
      {doctors && (
        <Typography
          variant="h4"
          component="div"
          color="#3f51b5"
          fontWeight="Bold"
          sx={{ mt: 3, mx: 3 }}
        >
          {doctors.length}+ Doctors
        </Typography>
      )}
      <Grid container spacing={2} sx={{ pl: 3 }}>
        {doctors ? (
          doctors.slice(start, end).map((doctor, index) => {
            return (
              <Grid item key={index} xs={12} lg={4} sx={{ mt: 3 }}>
                <Card
                  sx={{
                    width: 360,
                    height:300,
                    border: 1,
                    borderColor: "divider",
                    p: 2,
                    pr:6
                  }}
                >
                  <CardContent sx={{ display: "flex",height:"100%" }}>
                    <Avatar
                      src="/broken-image.jpg"
                      sx={{ width: 80, height: 80, mr: 3 }}
                    />
                    <Box sx={{height:"100%"  }}>
                      <Box  sx={{ height:"85%"  }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {getName(doctor.user.firstName, doctor.user.lastName)}
                        </Typography>
                        <Typography sx={{fontSize:13, mt: 1 }}>
                          {getQualification(doctor.Qualification)}
                        </Typography>
                        <Typography sx={{fontSize:13}}>
                          {getSpecialities(doctor.specialities)}
                        </Typography>
                        <Grid container>
                          <Grid item xs={6} sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize:13,fontWeight: "bold" }}>
                              Hospital
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ mt: 2 }}>
                            <Typography sx={{fontSize:13}}>
                              {doctor.hospitals
                                ? getHospitals(doctor.hospitals)
                                : "Not Available"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ mt: 1 }}>
                            <Typography sx={{fontSize:13, fontWeight: "bold" }}>
                              Languages
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ mt: 1 }}>
                            <Typography sx={{fontSize:13}}>
                              {doctor.languages
                                ? getLanguages(doctor.languages)
                                : "Not Available"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ mt: 2 }}>
                            <Typography sx={{fontSize:13, fontWeight: "bold" }}>
                              Next Available
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ mt: 2 }}>
                            <Typography sx={{fontSize:13}}>Not Available</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
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
        {doctors && <Pagination count={count} page={page} onChange={(event, value) =>setPage(value)} sx={{display:"flex" ,justifyContent:"center"}} />}</Grid>
      </Grid>
    
    </div>
  );
}
