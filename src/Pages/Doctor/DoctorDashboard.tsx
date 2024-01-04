import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
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
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/Store";
import { start } from "repl";
import { Close } from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
const DoctorDashboard = () => {
  const calculateEndTime = (value: Dayjs) => {
    let time = dayjs(value).add(30, "m").toDate();
    console.log(time);
    return time;
  };
  type slotTypes = {
    Id: string;
    deleted: boolean;
    count: number;
    doctorId: string;
    size: number;
    startTime: string;
    endTime: string;
  };
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [date, setDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState("11:00");
  const [startErr, setStartErr] = useState("");
  const [slots, setSlots] = useState([] as slotTypes[]);
  const [size, setSize] = useState<number | null>(2);
  const user = useAppSelector((state) => state.user);
  const getEndTime = () => {
    const endTime = new Date();
    const startSplitTime = startTime.split(":");
    console.log(startSplitTime);
    endTime.setHours(Number(startSplitTime[0]));
    endTime.setMinutes(Number(startSplitTime[1]) + 30);
    console.log(moment(endTime).format("hh:mm"));
    return moment(endTime).format("HH:mm");
  };
  getEndTime();

  console.log(user);
  useEffect(() => {
    getSlots();
  }, [user]);
  const getSlots = async () => {
    try {
      const id = user?.Id;
      console.log(id);
      const resp = await axios.get(
        `http://localhost:4000/slots?doctorId=${id}`
      );
      console.log(resp.data);

      const dateStr = date?.toLocaleString();
      let specifiedDate: Date;
      if (dateStr) {
        specifiedDate = new Date(dateStr);
        console.log(specifiedDate.toISOString());
      }

      const filteredSlots = resp.data.filter((item: slotTypes) =>
        item.startTime.startsWith(specifiedDate.toISOString().split("T")[0])
      );

      console.log(filteredSlots);
      setSlots(filteredSlots);
    } catch (error) {}
  };
  const validTime = (value: String) => {
    const startSplitTime = startTime.split(":");
    console.log(Number(startSplitTime[0]), new Date().getHours());
    if (Number(startSplitTime[0]) > new Date().getHours()) {
      setStartErr("");
    } else {
      setStartErr("Past time selected.Please select a time in future");
    }
  };

  // const disabled = () => {
  //   if (!validTime(startTime) || !size) {
  //     return true;
  //   }
  //   return false;
  // };
  const handleSubmit = () => {
    console.log(startTime);
    console.log(date);
    const startSplitTime = startTime.split(":");
    let startDate, endDate;

    const dateStr = date?.toLocaleString();
    if (dateStr) {
      startDate = new Date(dateStr);
      startDate.setHours(Number(startSplitTime[0]));
      startDate.setMinutes(Number(startSplitTime[1]));
      endDate = new Date();
      endDate.setTime(startDate.getTime() + 30 * 60 * 1000);
    }
    console.log(startDate, endDate);

    try {
      const res = axios.post("http://localhost:4000/slots", {
        booked: true,
        doctorId: user?.Id,
        size: size,
        startTime: startDate,
        endTime: endDate,
      });
      getSlots();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getTime = (value: string) => {
    const date = new Date(value);
    let hours = date.getHours();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;
    let minutes: string | number = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };
  return (
    <>
      <Grid container sx={{ backgroundColor: "white", p: 2 }}>
        <Grid item xs={12} sx={{ mx: 2, my: 1 }}>
          <Typography>Slots</Typography>
        </Grid>
        <Grid item xs={12} sx={{ borderTop: 1, borderColor: "divider" }}></Grid>
        <Grid item xs={12} md={5} lg={3} sx={{ mt: 2 }}>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar disablePast sx={{ border: 1, height: 280 }} />
          </LocalizationProvider> */}
          <Calendar value={date} onChange={setDate} minDate={new Date()} />
        </Grid>
        <Grid item xs={12} md={5} lg={3} sx={{ ml: 2, mt: 2 }}>
          <TextField
            type="time"
            label="Start Time"
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            onBlur={(e) => validTime(e.target.value)}
          />
          <TextField
            type="time"
            label="End Time"
            fullWidth
            value={getEndTime()}
            sx={{ mt: 2 }}
            disabled
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider> */}

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider> */}
          <Autocomplete
            id="combo-box-demo"
            options={[1, 2, 3, 4, 5]}
            sx={{ mt: 2 }}
            value={size}
            onChange={(event, value) => setSize(value)}
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
              // disabled={disabled()}
              onClick={handleSubmit}
            >
              Create Slot
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          lg={5}
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {!slots.length ? (
            <Typography
              sx={{ textAlign: "center", fontSize: 18, mt: 15, ml: 10 }}
            >
              No slot present on selected date
            </Typography>
          ) : (
            slots.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: 1,
                  borderColor: "silver",
                  mt: 2,
                  width: { xs: "400px", lg: "250px" },
                  height: "60px",
                  ml: 5,
                  p: 1,
                }}
              >
                <Box>
                  <Typography>
                    {getTime(item.startTime)} - {getTime(item.endTime)}
                  </Typography>
                  <Typography>
                    Slot size:{item.size} Booked:{item.count}
                  </Typography>
                </Box>
                <IconButton onClick={() => console.log(item.Id)}>
                  <Close />
                </IconButton>
              </Box>
            ))
          )}
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
