import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useAppSelector } from "../../Redux/Store";

const DoctorDashboard = () => {
  const calculateEndTime = (value: Dayjs) => {
    let time = dayjs(value).add(30, "m").toDate();
    console.log(time);
    return time;
  };
  let time = calculateEndTime(dayjs());
  const [endTime, setEndTime] = useState(time);
  const [startTime, setStartTime] = useState(dayjs());
  const [startErr, setStartErr] = useState("");
  const [size, setSize] = useState(2);
  const handleTime = (value: Dayjs) => {
    console.log(value.diff(dayjs(), "minutes"));
    if (validTime(value)) {
      setStartErr("");
      setEndTime(calculateEndTime(value));
      setStartTime(value);
    } else {
      setStartErr("Past time selected.Please select a time in future");
    }
  };
  const user=useAppSelector(state=>state.user)
  const validTime=(value:Dayjs)=>{
    return value.get("hours")>dayjs().get("hours")
      }
      const disabled=()=>{
        if(!validTime(startTime) || !size){
          return true;
        }
        return false
      }
      const handleSubmit=()=>{
      console.log(user);
      
        const res=axios.post("http://localhost:4000/slots",{
          booked:true,
        doctorId:user?.Id,
        size:size,
          startTime:startTime.toDate().toISOString(),
          endTime:endTime.toISOString()
        })
        console.log(res)
      }
  return (
    <>
      <Grid container sx={{ backgroundColor: "white", p: 2 }}>
        <Grid item xs={12} sx={{ mx: 2, my: 1 }}>
          <Typography>Slots</Typography>
        </Grid>
        <Grid item xs={12} sx={{ borderTop: 1, borderColor: "divider" }}></Grid>
        <Grid item xs={5} lg={3} sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar disablePast sx={{ border: 1, height: 280 }} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3} sx={{ ml: 2, mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText: startErr,
                  error: Boolean(startErr),
                },
              }}
              value={startTime}
              onChange={(value) => {
                if (value) {
                  handleTime(value);
                }
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              label="End Time"
              disabled
              value={endTime}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
              sx={{ mt: 2 }}
            />
          </LocalizationProvider>
          <Autocomplete
            id="combo-box-demo"
            options={[1, 2, 3, 4, 5]}
            sx={{ mt: 2 }}
            value={size}
            onChange={(value) => setSize(Number(value))}
            renderInput={(params) => (
              <TextField {...params} label="Appointment Size" fullWidth />
            )}
          />
          <Typography sx={{ mt: 2, fontSize: 12, color: "grey" }}>
            Slot duration: 30 minutes
          </Typography>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3f51b5", px: 4 }}
              disabled={disabled()}
              onClick={handleSubmit}
            >
              Create Slot
            </Button>
          </Box>
        </Grid>
        <Grid item xs={3} lg={5} sx={{ my: "auto" }}>
          <Typography sx={{ textAlign: "center", fontSize: 18 }}>
            No slot present on selected date
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ backgroundColor: "white", p: 8, mt: 5 }}>
        <Grid item xs={6} sx={{ my: "auto", p: 5 }}>
          <Typography sx={{ fontSize: 18 }}>
            No completed appointment so far
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ my: "auto", p: 5 }}>
          <Typography sx={{ fontSize: 18 }}>
            No upcoming appointment so far
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ backgroundColor: "white", p: 2, mt: 5 }}>
        <Grid item xs={6} sx={{ my: "auto", p: 5 }}>
          <Typography sx={{ fontSize: 18 }}>No review so far</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorDashboard;
