import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/Store";
import axios from "axios";
import moment from "moment";
import { slotTypes } from "../../utils/Doctors";
import { Close } from "@mui/icons-material";
import { appointmentTypes, getSlotTime } from "../../utils/appointments";


const DoctorAppointment = () => {
  const [value, setValue] = useState(10);
  const [appointment, setAppointment] = useState([] as appointmentTypes[]);
  const user = useAppSelector((state) => state.userReducer.user);
  const [page,setPage]=useState(1)
  let start, end,count;

    count = Math.ceil(appointment.length/value);
    start = value*page-value
     end=value*page
  useEffect(() => {
    getAppointmentData();
  }, [user]);
  const getAppointmentData = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:4000/appointments?doctorId=${user?.Id}`
      );
      console.log(resp);
      setAppointment(resp.data);
    } catch (error) {}
  };
 
  console.log(appointment);
  const deleteAppointment=async(id:string)=>{
  const resp=await axios.delete(`http://localhost:4000/appointments?appointmentId=${id}`)
  getAppointmentData()
  }
  return (
    <div>
    <Grid container>
      <Grid item xs={6}>
        <Typography sx={{ color: "#3f51b5", fontWeight: "bold", fontSize: 28 }}>
          My Appointments
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 15, color: "grey", mr: 1 }}>
            {" "}
            Number of records
          </Typography>

          <FormControl variant="standard">
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={value}
              onChange={(e) => {
                setValue(Number(e.target.value));
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      {!appointment.length ? (
        <Grid item xs={12} sx={{ backgroundColor: "white", mt: 1 }}>
          <Typography
            sx={{ fontSize: 15, color: "grey", p: 3, textAlign: "center" }}
          >
            No appointments are made yet
          </Typography>
        </Grid>
      ) : (
        appointment.slice(start,end).map((item) => (
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "white",
              mt: 2,
              py: 1,
              px: 2,
              border: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src="/broken-image.jpg"
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                {item.patient?.user.firstName}{" "}
                {item.patient?.user.lastName
                  ? item.patient.user.lastName
                  : "self"}
              </Typography>
            </Box>
            <Box>
              <span style={{ display: "flex" }}>
                <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                  Date:
                </Typography>
                <Typography sx={{ fontSize: 14, ml: 0.5 }}>
                  {moment(item.slot.startTime).format("D MMM, YYYY")}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                  Timing:
                </Typography>
                <Typography sx={{ fontSize: 14, ml: 0.5 }}>
                  {getSlotTime(item.slot)}
                </Typography>
              </span>
            </Box>
            <Box>
              <span style={{ display: "flex" }}>
                <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                  Patient:
                </Typography>
                <Typography sx={{ fontSize: 14, ml: 0.5 }}>
                  {item.otherName ? item.otherName : "Self"}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                  Status:
                </Typography>
                <span
                  style={{
                    borderRadius: "50rem",
                    backgroundColor: "#64b5f6",
                    padding: "2px 8px 0 3px",
                  }}
                >
                  <Typography sx={{ fontSize: 12, ml: 0.5, color: "#fff" }}>
                    {item.appointmentStatus}
                  </Typography>
                </span>
              </span>
            </Box>
            <Button variant="outlined" startIcon={<Close />} onClick={()=>deleteAppointment(item.Id)} sx={{borderColor:"#3f51b5", color:"#3f51b5"}}>
              Cancel
            </Button>
          </Grid>
        ))
      )}
    </Grid>
     {count && <Pagination variant="outlined" count={count} page={page} color="primary" onChange={(event,value)=>setPage(value)} sx={{display:"flex" ,justifyContent:"center",mt:3}} />}
     </div>
  );
};

export default DoctorAppointment;
